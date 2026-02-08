using Microsoft.EntityFrameworkCore;
using FurBaby.Api.Models;

namespace FurBaby.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.Property(x => x.OwnerName).HasMaxLength(120).IsRequired();
            entity.Property(x => x.OwnerPhone).HasMaxLength(40).IsRequired();
            entity.Property(x => x.OwnerEmail).HasMaxLength(120);
            entity.Property(x => x.PetType).HasMaxLength(20).IsRequired();
            entity.Property(x => x.PetName).HasMaxLength(80).IsRequired();
            entity.Property(x => x.Breed).HasMaxLength(80);
            entity.Property(x => x.ServiceType).HasMaxLength(40).IsRequired();
            entity.Property(x => x.Notes).HasMaxLength(500);
        });
    }
}
