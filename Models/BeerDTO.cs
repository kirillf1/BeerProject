using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    public class BeerDTO
    {
        public int BeerId { get; set; }
        public string Name
        {
            get; set;
        }

        public string Country
        {
            get; set;
        }

        public double Rating { get; set; }


        public double Price { get; set; }
        public string PhotoId { get; set; }
        public double Alcohol { get; set; }
        public string Category { get; set; }

      

        public string Style { get; set; }



        public static  BeerDTO Create(Beer beer)
        {
            var newBeerDTO = new BeerDTO();
            newBeerDTO.Alcohol = beer.Alcohol;
            newBeerDTO.BeerId = beer.BeerId;
            newBeerDTO.Style = beer.Style?.StyleName;
            newBeerDTO.Category = beer.Category?.CategoryName;
            newBeerDTO.Color = beer.Color?.Name;
            newBeerDTO.Price = beer.Price;
            newBeerDTO.Name = beer.Name;
            newBeerDTO.Country = beer.Country?.Name;
            newBeerDTO.PhotoId = beer.PhotoId;
            newBeerDTO.Rating = beer.Rating;
            return newBeerDTO;
        }

        public string Color { get; set; }
    }
}
