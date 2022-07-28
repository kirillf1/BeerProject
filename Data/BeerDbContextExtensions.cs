using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BeerProject.Models;
using Microsoft.EntityFrameworkCore;

namespace BeerProject.Data
{
   
    public static class BeerDbContextExtensions
    {
        public static IQueryable<Beer> GetFromQuery(this IQueryable<Beer> beers, BeerQueryObject beerQuery)
        {
            var type = beerQuery.GetType();
            var props = type.GetProperties().Where(p => p.GetValue(beerQuery) != null);
            foreach (var item in props)
            {
                var value = item.GetValue(beerQuery);
                var propName = item.Name;
                if (item.PropertyType == typeof(string))
                {
                    string expresion = $"==(@";

                    if (propName == "Name")

                        expresion = $".Contains(@";


                    string argumentString = "";
                    var vals = value.ToString().Split(',');
                    var itemsCount = vals.Length;



                    var values = new List<string>();
                    for (int i = 0; i < itemsCount; i++)
                    {
                        values.Add(vals[i]);
                    }


                    for (int i = 0; i < values.Count; i++)
                    {
                        argumentString = argumentString + propName;
                        argumentString = argumentString + expresion + i + ")";
                        if (i != (values.Count - 1))
                        {
                            argumentString = argumentString + " or ";
                        }
                    }
                    beers = beers.Where(argumentString, values.ToArray());
                }
                else
                {

                    if (propName.StartsWith("Min"))
                    {
                        beers = beers.Where($"{propName.Replace("Min", "")} >={value}");
                    }
                    else if (propName.StartsWith("Max"))
                    {
                        beers = beers.Where($"{propName.Replace("Max", "")} <={value}");
                    }
                    else
                    {
                        beers = beers.Where($"{propName} =={value}");
                    }
                }

            }
            return beers;
        }
        public static IQueryable<Beer> GetBeers(this IQueryable<Beer> beerContext, BeerQueryObject beerQuery)

        {
            //if (beerQuery.Name != null)
            //{
               
            //        beerContext = beerContext.Where(b => b.Name.ToLower().Contains(beerQuery.Name[0]));
                

            //}
            var type = beerQuery.GetType();
            var props = type.GetProperties().Where(p => p.GetValue(beerQuery) != null).ToList();
            foreach (var item in props.Where(p => p.PropertyType == typeof(List<string>)))
            {
                beerContext = beerContext.GetBeersListQuery(item.GetValue(beerQuery) as List<string>, item.Name);
            }
            foreach (var item in props.Where(p => p.PropertyType == typeof(double?)))
            {
                beerContext = beerContext.GetBeersDoubleQuery(item.GetValue(beerQuery) as double?, item.Name);
            }
            foreach (var item in props.Where(p => p.PropertyType == typeof(bool?)))
            {
                beerContext = beerContext.GetBeersBoolQuery(item.GetValue(beerQuery) as bool?, item.Name);
            }
          

            return beerContext;
        }

        private static IQueryable<Beer> GetBeersDoubleQuery(this IQueryable<Beer> beers, double? value, string propName)
        {

            if (propName.StartsWith("Min"))
            {
                return beers.Where($"{propName.Replace("Min", "")} >={value}");
            }
            else if (propName.StartsWith("Max"))
            {
                return beers.Where($"{propName.Replace("Max", "")} <={value}");
            }
            else
            {
                return beers.Where($"{propName} =={value}");
            }
        }
        private static IQueryable<Beer> GetBeersBoolQuery(this IQueryable<Beer> beers, bool? value, string propName)
        {


            return beers.Where($"{propName} =={value}");


        }
        private static IQueryable<Beer> GetBeersListQuery(this IQueryable<Beer> beers, List<string> values, string propName)
        {
            string expresion = $"==(@";

            if (propName == "Name")

                expresion = $".Contains(@";


            string argumentString = "";
            var vals = values[0].Split(',');
            var itemsCount = vals.Length;
            
            if (itemsCount >0)
            {
             
                values = new List<string>();
                for (int i = 0; i < itemsCount; i++)
                {
                    values.Add(vals[i]);
                }
            }
           
                for (int i = 0; i < values.Count; i++)
                {
                    argumentString = argumentString + propName;
                    argumentString = argumentString + expresion+i+")";
                    if (i != (values.Count - 1))
                    {
                        argumentString = argumentString + " or ";
                    }
                }
                return beers.Where(argumentString, values.ToArray());
            

            
        }
        //private string createExpresion(string propName,string value)
        //{

        //}
        public static async Task<IQueryable<Beer>> GetBeersAsync(this IQueryable<Beer> beers, BeerQueryObject beerQuery)
        {


            return await Task.Run(() =>
            {
                return beers.GetFromQuery(beerQuery);
            });

        }

    }
}
