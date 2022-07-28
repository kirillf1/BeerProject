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
    public class FactoriesController : ControllerBase
    {
        private readonly BeerContext _context;

        public FactoriesController(BeerContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResult<FactoryDTO>>> GetCountries([FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 10, [FromQuery] string sortColumn = null,
[FromQuery] string sortOrder = null, [FromQuery] string filterColumn = null,
[FromQuery] string filterQuery = null)
        {
            var factories = _context.Factories.AsNoTracking().AsQueryable();
            if (!String.IsNullOrEmpty(filterColumn) && !String.IsNullOrEmpty(filterQuery))
            {
               factories = factories.Where(c => c.Name.Contains(filterQuery));
            }
            var val = await ApiResult<FactoryDTO>.CreateAsync(factories.Include(c => c.Country).Include(b=>b.Beers).Select(c => new FactoryDTO { Name = c.Name, BeerCount= c.Beers.Count,Id = c.Id, CountryId = c.CountryId, Country = new CountryDTO() {  Name = c.Country.Name } })

            , pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
            return val;
        }
        
        // GET: api/Factories/5
        [HttpGet("{id}")]

        public async Task<ActionResult<Factory>> GetFactory(int id)
        {
            var factory = await _context.Factories.FindAsync(id);

            if (factory == null)
            {
                return NotFound();
            }

            return factory;
        }

        // PUT: api/Factories/5
        [Authorize(Roles = Role.Admin)]
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFactory(int id, Factory factory)
        {
            if (id != factory.Id)
            {
                return BadRequest();
            }

            _context.Entry(factory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactoryExists(id))
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

        // POST: api/Factories

        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Factory>> PostFactory(Factory factory)
        {
            _context.Factories.Add(factory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactory", new { id = factory.Id }, factory);
        }
        [Authorize(Roles = Role.Admin)]
        // DELETE: api/Factories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFactory(int id)
        {
            var factory = await _context.Factories.Include(b => b.Beers).FirstOrDefaultAsync(f=>f.Id == id);
            if (factory == null)
            {
                return NotFound();
            }

            _context.Factories.Remove(factory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FactoryExists(int id)
        {
            return _context.Factories.Any(e => e.Id == id);
        }
    }
}
