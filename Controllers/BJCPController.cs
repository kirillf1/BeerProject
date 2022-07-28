using BeerProject.Data;
using BeerProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BJCPController : ControllerBase
    {
        private BeerContext _context;

        public BJCPController(BeerContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("Categories")]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
        {
            return await _context.Categories.Select(c => new CategoryDTO { CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            }).ToListAsync();

          }
        [HttpGet]
        [Route("Description")]
        public async Task<ActionResult<string>> GetDescripction(bool isCategory, string categoryName)
        {
            if (isCategory)
            {
                var category = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryName == categoryName);
                if (category == null)
                {
                    return NotFound();
                }
                return category.Description;
            }
            else
            {
                var style = await _context.Styles.FirstOrDefaultAsync(c => c.StyleName == categoryName);
                if (style == null)
                {
                    return NotFound();
                }
                return style.Description;
            }
        }
        [HttpGet]
        [Route("Styles")]
        public async Task<ActionResult<IEnumerable< StyleDTO>>> GetStyles(string categoryName)
        {
            if (categoryName == null || categoryName=="null") { 
            return await _context.Styles.Select(s => new StyleDTO { StyleId = s.StyleId, StyleName = s.StyleName }).OrderBy(s=>s.StyleName).ToListAsync();
            }
           var names = categoryName.Split(',');
            List<Style> styles =new List<Style>();
            foreach (var item in names)
            {
               var category = (await _context.Categories.Include(c => c.Styles).FirstOrDefaultAsync(c => c.CategoryName ==item));
                if (category != null)
                styles.AddRange(category.Styles);
            }
 
            if (styles.Count==0)
            {
                return NotFound();
            }
            return styles.Select(s => new StyleDTO { StyleId = s.StyleId, StyleName = s.StyleName }).OrderBy(s => s.StyleName).ToList();
        }
        [HttpGet]
        [Route("StylesById")]
        public async Task<ActionResult<IEnumerable<StyleDTO>>> GetStylesById(int? categoryId)
        {
            if (categoryId == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.Include(c => c.Styles).FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            if (category.Styles.Count == 0)
            {
                return NotFound();
            }
            return category.Styles.Select(s => new StyleDTO { StyleId = s.StyleId, StyleName = s.StyleName }).OrderBy(s => s.StyleName).ToList();
        }
        [HttpGet]
        [Route("CategoryById")]
        public async Task<ActionResult<CategoryDTO>> CategoryById(int? styleId)
        {
            if (styleId == null)
            {
                return NotFound();
            }
            var style = await _context.Styles.Include(c => c.Category).FirstOrDefaultAsync(c => c.StyleId == styleId);
            if (style==null)
            {
                return NotFound();
            }
            return new CategoryDTO { CategoryId =style.Category.CategoryId,CategoryName = style.Category.CategoryName};
        }
        [HttpGet]
        public async Task<ActionResult<ApiResult<BJCPmodel>>> Get([FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 10, [FromQuery] string sortColumn = null,
[FromQuery] string sortOrder = null, [FromQuery] string filterColumn = null,
[FromQuery] string filterQuery = null)
        {
            var bjcp = _context.Categories.AsNoTracking().AsQueryable();
            if (!String.IsNullOrEmpty(filterColumn) && !String.IsNullOrEmpty(filterQuery))
            {
                bjcp = bjcp.Where(c => c.CategoryName.Contains(filterQuery));
            }
            var dto = bjcp.Select(c => new BJCPmodel
            {
                Category = new CategoryDTO { CategoryId = c.CategoryId, CategoryName = c.CategoryName,BeerCount = c.Beers.Count },
                Styles = c.Styles.Select(s => new StyleDTO { StyleId = s.StyleId, StyleName = s.StyleName }).ToList()
            });
            dto.Load();
            var val = await ApiResult<BJCPmodel>.CreateAsync(dto

            , pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
            return val;
        }
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<BJCPmodel>>> Get()
        //{
        //    return await _context.Categories.Include(c => c.Styles).Select(c => new BJCPmodel
        //    {
        //        Category = new CategoryDTO { CategoryId = c.CategoryId, CategoryName = c.CategoryName, Description = c.Description },
        //        Styles = c.Styles.Select(s => new StyleDTO { StyleId = s.StyleId, StyleName = s.StyleName }).ToList()
        //    }).ToListAsync();
        //}
    }
}
