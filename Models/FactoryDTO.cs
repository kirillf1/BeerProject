using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    public class FactoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CountryId { get; set; }
        public CountryDTO Country { get; set; }
        public int BeerCount { get; set; }
    }
}
