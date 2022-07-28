using BeerProject.Data;
using BeerProject.Models;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Reflection;
namespace BeerProject.services
{
    public static class BeerServiceCollection
    {

        public static IServiceCollection AddBeerServices(this IServiceCollection services)
        {
            services.AddSingleton(provider =>
            {
               
               
                
                    var beerProps = new BeerProps();
                   
                    return beerProps;
                

                
            });

            //services.AddScoped< BuilderViaJson>();
          
            return services;
        }
    }
}

