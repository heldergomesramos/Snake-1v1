using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly ApplicationDBContext _context;

        public PlayerRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Player?> GetPlayerByUsernameAsync(string username)
        {
            return await _context.Players.SingleOrDefaultAsync(p => p.Username == username);
        }

        public async Task AddPlayerAsync(Player player)
        {
            _context.Players.Add(player);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Player>> GetAllPlayersAsync()
        {
            return await _context.Players.ToListAsync();
        }
    }
}