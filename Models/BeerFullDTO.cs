using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    public class BeerFullDTO
    {
        //public BeerDTO(string name, int id, string photoUrl )
        //{
        //    BeerName = name;
        //    PhotoUrl = photoUrl;
        //    Id = id;
        //}
        public int BeerId { get; set; }
        public int? CountryId { get; set; }
        public int? ColorId { get; set; }
        public int? FactoryId { get; set; }
        public string Name
        {
            get; set;
        }

        public string Country
        {
            get; set;
        }
      

        public int? CategoryId { get; set; }

        public string Category { get; set; }

        public int? StyleId { get; set; }

        public string Style { get; set; }


        public string Description { get; set; }
        public double Rating { get; set; }

        public string Color { get; set; }

        public bool Filtration { get; set; }
        public bool Pasterisation { get; set; }

        public string Factory { get; set; }

        public double Price { get; set; }

        public double Alcohol { get; set; }
        public string Taste { get; set; }
        public bool IsLocalShop { get; set; }
        public  List<Comment> Comments { get; set; }
        public double Bitterness { get; set; }
        // экстарактивность начального сусла
        public double InitialWort { get; set; }
        public string PhotoId { get; set; }
        public static BeerFullDTO Create(Beer beer)
        {
            var newBeerDTO = new BeerFullDTO();
            newBeerDTO.Alcohol = beer.Alcohol;
            //newBeerDTO.BeerId = beer.BeerId;
            newBeerDTO.Bitterness = beer.Bitterness;
            newBeerDTO.CategoryId = beer.CategoryId;
            newBeerDTO.StyleId = beer.StyleId;
            //newBeerDTO.FactoryId = beer.FactoryId;
            //newBeerDTO.ColorId = beer.ColorId;
            newBeerDTO.CountryId = beer.CountryId;
            newBeerDTO.Color = beer.Color?.Name;
            newBeerDTO.Comments = beer.Comments;
            newBeerDTO.Country = beer.Country?.Name;
            newBeerDTO.Description = beer.Description;
            newBeerDTO.Factory = beer.Factory?.Name;
            newBeerDTO.Filtration = beer.Filtration;
            newBeerDTO.InitialWort = beer.InitialWort;
            newBeerDTO.IsLocalShop = beer.IsLocalShop;
            newBeerDTO.Name = beer.Name;
            newBeerDTO.Style = beer.Style?.StyleName;
            newBeerDTO.Category = beer.Category?.CategoryName;
            newBeerDTO.Pasterisation = beer.Pasterisation;
            newBeerDTO.PhotoId = beer.PhotoId;
            newBeerDTO.Price = beer.Price;
            newBeerDTO.Rating = beer.Rating;
            newBeerDTO.Taste = beer.Taste;
            return newBeerDTO;
        }
    }
}
