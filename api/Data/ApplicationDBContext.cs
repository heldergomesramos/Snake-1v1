using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Lobby> Lobbies { get; set; }
        public DbSet<GameSettings> GameSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Lobby>()
                        .HasOne(l => l.HostPlayer)
                        .WithMany()
                        .HasForeignKey(l => l.HostPlayerId)
                        .OnDelete(DeleteBehavior.Restrict);  // Ensure you handle cascading deletes as needed
            modelBuilder.Entity<Lobby>()
                        .HasOne(l => l.InviteePlayer)
                        .WithMany()
                        .HasForeignKey(l => l.InviteePlayerId)
                        .OnDelete(DeleteBehavior.Restrict);  // Ensure you handle cascading deletes as needed

            modelBuilder.Entity<Lobby>()
                        .HasOne(l => l.GameSettings)
                        .WithMany()
                        .HasForeignKey(l => l.GameSettingsId)
                        .OnDelete(DeleteBehavior.Restrict);  // Ensure you handle cascading deletes as needed
        }
    }
}