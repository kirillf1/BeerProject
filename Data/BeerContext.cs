
using BeerProject.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;



namespace BeerProject.Data
{
    public class BeerContext : DbContext
    {
        public DbSet<Beer> Beers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Style> Styles { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Factory> Factories { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<User> User { get; set; }

       
        public BeerContext(DbContextOptions options) :base(options)
    { 


}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Beer>()
                .HasOne(p => p.Country)
                .WithMany(t => t.Beers)
                 .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Beer>()
                .HasOne(p => p.Factory)
                .WithMany(t => t.Beers)
 .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Color>()
             .HasMany<Beer>(c => c.Beers).WithOne(b => b.Color).OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Factory>().HasOne(p => p.Country)
                .WithMany(t => t.Factories).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
