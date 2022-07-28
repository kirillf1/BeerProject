
using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Data
{
    public class Style
    {
       
        public int StyleId { get; set; }
        public string StyleName { get; set; }
     
        public virtual int CategoryId { get; set; }
      
        public virtual Category Category { get; set; }
      public string Description { get; set; }
        public virtual List<Beer> Beers { get; set; }
        public Style()
        {
            Beers = new List<Beer>();
        }
        public override string ToString()
        {
            return StyleName;
        }
    }
}
