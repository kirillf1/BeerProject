using BeerProject.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    
    public class BJCPmodel
    {
      public CategoryDTO Category { get; set; }

        public virtual List<StyleDTO> Styles { get; set; }
    }
}
