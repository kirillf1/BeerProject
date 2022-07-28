using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeerProject.Data
{
   public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Beer> Beers { get; set; } = new List<Beer>();
    }
}
