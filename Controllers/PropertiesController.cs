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
    public class PropertiesController : ControllerBase
    {
        BeerContext _beerContext;
        BeerProps _props;
public PropertiesController(BeerContext beerContext,BeerProps props)
        {
            _beerContext = beerContext;
            _props = props;
        }
        [HttpGet]
        
        public async Task<ActionResult<dynamic>> GetProperties(string propName)
        {
           if(!_props.isNull(propName))
            {
                try
                {
                    var val = _props.GetType().GetProperty(propName);



                    List<string> value = (List<string>)val.GetValue(_props);
                    if (value.Count == 0)
                        return NotFound();
                    return value.ToList();
                }
                catch
                {
                    return NotFound();
                }
            }
            try
            {
                var val = await _beerContext.Beers.Include(b=>b.Category).Include(b=>b.Style).
                    Select(x => x.GetType().GetProperty(propName).GetValue(x)).ToListAsync();
                List<string> value;
                // Нужно сделать более гибкую систему
                if (propName == "Style")
                {
                  value =  val.Cast<Style>().Select(s => s?.StyleName).ToList();
                }
                else if (propName == "Category")
                {
                   value = val.Cast<Category>().Select(c => c?.CategoryName).ToList();
                }
                else
                {
                    value = val.Cast<string>().ToList();
                }
               
               value = value.Distinct().Where(v => v != null && v!="").ToList();
                value.Sort();
                if (value.Count == 0)
                    return NotFound();
                _props.GetType().GetProperty(propName).SetValue(_props, value);
                return value;
            }
            catch(Exception e)
            {
                var l = e.Message;
                return NotFound();
            }
        }
       
    }
}


