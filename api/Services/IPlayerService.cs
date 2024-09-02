using api.Dtos.Player;
using api.Models;

namespace api.Services
{
    public interface IPlayerService
    {
        Task UpdatePlayerAsync(Player player);
        Task<Player?> GetPlayerByIdAsync(string id);
        Task<Player?> GetPlayerByUsernameAsync(string username);
        Task<List<Player>> GetAllPlayersAsync();
        Task<PlayerRegisterResponseDto?> RegisterPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> LoginPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> CreateGuestAsync();
    }
}
