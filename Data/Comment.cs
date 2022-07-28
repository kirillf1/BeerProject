using BeerProject.Data;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace BeerProject.Data
{
    public class Comment
    {
        public int Id { get; set; }
       
        public int BeerId { get; set; }
        public DateTime CreationTime { get; set; }
        public string Title { get; set; }
        public User User { get; set; }
        public int? UserId { get; set; }
        
        public virtual Beer Beer { get; set; }
        public Comment()
        {
            CreationTime = DateTime.Now;
        }
    }
}
