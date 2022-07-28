
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Data
{
    public class Category
    {
     
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual List<Style> Styles { get; set; } = new List<Style>();
        public string Description { get; set; }
        public virtual List<Beer> Beers { get; set; } = new List<Beer>();
        public Category()
        {
            Beers = new List<Beer>();
            Styles = new List<Style>();
        }
        public override string ToString()
        {
            return CategoryName;
        }
    }
}
