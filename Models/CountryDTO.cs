using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    public class CountryDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }

        public List<Factory> Factories { get; set; }
        public int BeerCount { get; set; }
        public int FactoryCount { get; set; }
    }
}
