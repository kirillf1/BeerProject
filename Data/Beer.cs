

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerProject.Data
{
    public class Beer
    {
        public int BeerId { get; set; }
        
        public string Name
        {
            get; set;
        }

        public int? CountryId { get; set; }
        public virtual Country Country
        {
            get; set;
        }


        public int? CategoryId { get; set; }
     
        public virtual Category Category { get; set; } // тип это лагер, эль и т.д.
                                          //[Display(Name = "Стиль пива")]
        public int? StyleId { get; set; }
     
        public virtual Style Style { get; set; } //стили это портер и т.д

    
        public string Description { get; set; }
        public double Rating { get; set; }


        public int? ColorId { get; set; }

        public virtual Color Color { get; set; }

        public bool Filtration { get; set; }
        public bool Pasterisation { get; set; }

        public int? FactoryId { get; set; }
        public virtual Factory Factory { get; set; }

        public double Price { get; set; }

        public double Alcohol { get; set; }
        public string Taste { get; set; }
        public bool IsLocalShop { get; set; }
        public virtual List<Comment> Comments { get; set; }
        public double Bitterness { get; set; }
        // экстарактивность начального сусла
        public double InitialWort { get; set; }
        public string PhotoId { get; set; }
        
        public Beer()
        {
            Comments = new List<Comment>();
        }
        //public override string ToString()
        //{
        //    var propNames = new string[] { "Название: ", "Cтрана : ","Тип пива: " , "Стиль пива :", "Рейтинг пива(от 1 до 10) : ", "Цвет: ", "Фильтрация: ", "Пастеризация: ",
        //   "Где произведено: ","Цена(за 0.33-0.5 л): ", "Процент алкоголя: ","Вкус: ", "Комментарий: "};
        //    StringBuilder builder = new StringBuilder();
        //    var props = typeof(Beer).GetProperties();
        //    for (int i = 0; i < propNames.Length; i++)
        //    {
        //        var value = props[i].GetValue(this);
        //        if (value != null)
        //            builder.AppendLine(propNames[i] + value.ToString());
        //    }

        //    return builder.ToString();
        //}
        public override bool Equals(object obj)
        {

            if (obj is Beer beer)
            {
                if (String.Compare(Name, beer.Name, true) == 0)
                    return true;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return -254647643 + EqualityComparer<string>.Default.GetHashCode(Name.ToLower());
        }
    
}
}
