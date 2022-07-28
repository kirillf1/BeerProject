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
    public class ColorsController : ControllerBase
    {
        private readonly BeerContext _context;

        public ColorsController(BeerContext context)
        {
            _context = context;
        }

        // GET: api/Colors
        [HttpGet]
        public async Task<ActionResult<ApiResult<ColorDTO>>> GetCountries([FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 10, [FromQuery] string sortColumn = null,
[FromQuery] string sortOrder = null, [FromQuery] string filterColumn = null,
[FromQuery] string filterQuery = null)
        {
            var colors = _context.Colors.AsNoTracking().AsQueryable();
            if (!String.IsNullOrEmpty(filterColumn) && !String.IsNullOrEmpty(filterQuery))
            {
                colors = colors.Where(c => c.Name.Contains(filterQuery));
            }
            var dto = colors.Include(c=>c.Beers).Select(c => new ColorDTO { Name = c.Name, BeerCount = c.Beers.Count, Id = c.Id });
           
            var val = await ApiResult<ColorDTO>.CreateAsync(dto

            , pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
            return val;
        }

        // GET: api/Colors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(int id)
        {
            var color = await _context.Colors.FirstOrDefaultAsync(c => c.Id == id);

            if (color == null)
            {
                return NotFound();
            }

            return color;
        }

        // PUT: api/Colors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> PutColor(int id, Color color)
        {
            if (id != color.Id)
            {
                return BadRequest();
            }

            _context.Entry(color).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
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

        // POST: api/Colors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = Role.Admin)]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            _context.Colors.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.Id }, color);
        }

        // DELETE: api/Colors/5
        [HttpDelete("{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> DeleteColor(int id)
        {
            var color = await _context.Colors.Include(b=>b.Beers).FirstOrDefaultAsync(c=>c.Id==id);
            if (color == null)
            {
                return NotFound();
            }

            _context.Colors.Remove(color);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ColorExists(int id)
        {
            return _context.Colors.Any(e => e.Id == id);
        }
    }
}
