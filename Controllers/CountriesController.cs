using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeerProject.Data;
using BeerProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace BeerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly BeerContext _context;

        public CountriesController(BeerContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResult<CountryDTO>>> GetCountries([FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 10, [FromQuery] string sortColumn = null,
[FromQuery] string sortOrder = null, [FromQuery] string filterColumn = null,
[FromQuery] string filterQuery = null)
        {
            var countries = _context.Countries.AsNoTracking().AsQueryable();
            if (!String.IsNullOrEmpty(filterColumn) && !String.IsNullOrEmpty(filterQuery))
            {
                countries = countries.Where(c => c.Name.Contains(filterQuery));
            }
            var dto = countries.Select(c => new CountryDTO { Name = c.Name, BeerCount = c.Beers.Count,FactoryCount = c.Factories.Count, Id = c.Id, Factories = c.Factories });
            dto.Load();
            var val = await ApiResult<CountryDTO>.CreateAsync(dto
                
            , pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
            return val;
        }
        // GET: api/Countries
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CountryDTO>>> GetCountries()
        //{
        //var countries = _context.Countries.Select(c => new CountryDTO { Name = c.Name, Id = c.Id });
        //return await    countries.ToListAsync();
        //}

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country == null)
            {
                return NotFound();
            }

            return country;
        }

        // PUT: api/Countries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> PutCountry(int id, Country country)
        {
            if (id != country.Id)
            {
                return BadRequest();
            }

            _context.Entry(country).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Countries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCountry", new { id = country.Id }, country);
        }

        // DELETE: api/Countries/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await _context.Countries.Include(b => b.Beers).Include(f=>f.Factories).FirstOrDefaultAsync(c=>c.Id==id);
            if (country == null)
            {
                return NotFound();
            }
           
            
            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CountryExists(int id)
        {
            return _context.Countries.Any(e => e.Id == id);
        }
    }
}
