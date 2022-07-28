using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    public class BeerQueryObject
    {
        
        public string Name { get; set; }
        public string CountryId { get; set; }
        public string ColorId { get; set; }

        public double? MinRating { get; set; }
        public double? MaxRating { get; set; }
        public double? MinAlcohol { get; set; }
        public double? MaxAlcohol { get; set; }
        public double? MinPrice { get; set; }
        public double? MaxPrice { get; set; }
        public double? MinBitterness { get; set; }
        public double? MaxBitterness { get; set; }
        public string StyleId { get; set; }
        public string CategoryId { get; set; }
        public string FactoryId { get; set; }
        public bool? IsLocalShop { get; set; }
        public bool? Filtration { get; set; }
        public bool? Pasterisation { get; set; }
    }
}
