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
    public class BeersController : ControllerBase
    {
        private readonly BeerContext _context;

        public BeersController(BeerContext context)
        {
            _context = context;
        }

        // GET: api/Beers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beer>>> GetBeers()
        {
            return await _context.Beers.ToListAsync();
        }
        [Route("GetBeersFull")]
        [HttpGet]
        public async Task<ActionResult<ApiResult<BeerFullDTO>>> GetBeersFull([FromQuery] BeerQueryObject beerQuery, int pageIndex, int pageSize, string sortColumn = null,
 string sortOrder = null)
        {
            var be = await _context.Beers.Include(b => b.Style).Include(b => b.Category).Include(b => b.Country).Include(b => b.Color).Include(b => b.Factory)
                 .GetBeersAsync(beerQuery);
            //return await beers.Include(b => b.Style).ThenInclude(b => b.Category).Select(b => BeerDTO.Create(b)).ToListAsync();
            var dto = be.Select(beer => new BeerFullDTO {
                #region Init
                Alcohol = beer.Alcohol,
            BeerId = beer.BeerId,
            Bitterness = beer.Bitterness,
            CategoryId = beer.CategoryId,
            StyleId = beer.StyleId,
            FactoryId = beer.FactoryId,
            ColorId = beer.ColorId,
            CountryId = beer.CountryId,
            Color = beer.Color.Name,
            Comments = beer.Comments,
            Country = beer.Country.Name,
            Description = beer.Description,
            Factory = beer.Factory.Name,
            Filtration = beer.Filtration,
            InitialWort = beer.InitialWort,
            IsLocalShop = beer.IsLocalShop,
            Name = beer.Name,
            Style = beer.Style.StyleName,
            Category = beer.Category.CategoryName,
            Pasterisation = beer.Pasterisation,
            PhotoId = beer.PhotoId,
            Price = beer.Price,
            Rating = beer.Rating,
            Taste = beer.Taste
                #endregion
            });
            dto.Load();
            return await ApiResult<BeerFullDTO>.CreateAsync(dto,
                pageIndex, pageSize, sortColumn, sortOrder);
        }
        [Route("GetBeers")]
        [HttpGet]
        public async Task<ActionResult<ApiResult<BeerDTO>>> GetBeers([FromQuery] BeerQueryObject beerQuery, int pageIndex, int pageSize, string sortColumn = null,
 string sortOrder = null)
        {
            var be = await _context.Beers
                 .GetBeersAsync(beerQuery);
            //return await beers.Include(b => b.Style).ThenInclude(b => b.Category).Select(b => BeerDTO.Create(b)).ToListAsync();
            var dto = be.Select(beer => new BeerDTO {
            Alcohol = beer.Alcohol,
            BeerId = beer.BeerId,
            Style = beer.Style.StyleName,
            Category = beer.Category.CategoryName,
            Color = beer.Color.Name,
            Price = beer.Price,
            Name = beer.Name,
            Country = beer.Country.Name,
                PhotoId = beer.PhotoId,
                Rating = beer.Rating
        });
            dto.Load();
            return await ApiResult<BeerDTO>.CreateAsync(dto, 
                pageIndex, pageSize, sortColumn, sortOrder) ;
        }
        [Authorize(Roles = Role.Admin)]
        [Route("GetBeerAdm")]
        [HttpGet]
        public async Task<ActionResult<Beer>> GetBeerAdm([FromQuery] int id)
        {
            var beer = await _context.Beers.FindAsync(id);

            if (beer == null)
            {
                return NotFound();
            }

            return beer;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BeerFullDTO>> GetBeer(int id)
        {
            var beer = await _context.Beers.Include(b=>b.Style).Include(b=>b.Category).Include(c=>c.Color).Include(c=>c.Country).Include(f=>f.Factory)
                .FirstOrDefaultAsync(b=>b.BeerId==id);
           
            if (beer == null)
            {
                return NotFound();
            }

            return BeerFullDTO.Create(beer); 
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeer(int id, Beer beer)
        {
            if (id != beer.BeerId)
            {
                return BadRequest();
            }

            _context.Entry(beer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeerExists(id))
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

        // POST: api/Beers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Beer>> PostBeer(Beer beer)
        {
            _context.Beers.Add(beer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeer", new { id = beer.BeerId }, beer);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Beer>> DeleteBeer(int id)
        {
            var beer = await _context.Beers.FindAsync(id);
            if (beer == null)
            {
                return NotFound();
            }

            _context.Beers.Remove(beer);
            await _context.SaveChangesAsync();

            return beer;
        }
        [HttpPost]
        [Route("IsDupeBeer")]
        public bool IsDupeBeer(Beer beer)
        {
            return _context.Beers.Any(
            e => e.Name == beer.Name
            && e.Country == beer.Country);
        }
        private bool BeerExists(int id)
        {
            return _context.Beers.Any(e => e.BeerId == id);
        }
    }
}
