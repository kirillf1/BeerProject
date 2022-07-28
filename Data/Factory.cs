using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeerProject.Data
{
  public  class Factory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public string Description { get; set; }
        public virtual List<Beer> Beers { get; set; } = new List<Beer>();
        public int? CountryId { get; set; }
        public virtual Country Country { get; set; }
        public string Description { get; set; }
    }
}
