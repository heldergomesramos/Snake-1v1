using api.Dtos.Player;
using api.Models;

namespace api.Services
{
    public interface IPlayerService
    {
        Task<Player?> GetPlayerByUsernameAsync(string username);
        Task<List<Player>> GetAllPlayersAsync();
        Task<PlayerRegisterResponseDto?> RegisterPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> LoginPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> CreateGuestAsync();
    }
}
