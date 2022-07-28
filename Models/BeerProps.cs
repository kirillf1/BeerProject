using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Models
{
    public class BeerProps
    {

        public List<string> Country
        {
            get; set;
        }
        public List<string> Category { get; set; }

        public List<string> Style { get; set; }


        public List<string> Color { get; set; }


        public List<string> Factory { get; set; }

 

        public bool isNull(string propName)
        {

            var type = typeof(BeerProps);
            try
            {
                if (type.GetProperty(propName).GetValue(this) != null)
                    return false;
                return true;

            }
            catch
            {
                return true;
            }
        }
    }
}
