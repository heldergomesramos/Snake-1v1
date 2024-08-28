using api.Models;

namespace api.Repositories
{
    public interface IPlayerRepository
    {
        Task<Player?> GetPlayerByUsernameAsync(string username);
        Task<List<Player>> GetAllPlayersAsync();
        Task AddPlayerAsync(Player player);
        Task UpdatePlayerAsync(Player player);
    }
}