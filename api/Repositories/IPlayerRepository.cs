using api.Models;

namespace api.Repositories
{
    public interface IPlayerRepository
    {
        Task<Player?> GetPlayerByUsernameAsync(string username);
        Task AddPlayerAsync(Player player);
        Task<List<Player>> GetAllPlayersAsync();
    }
}