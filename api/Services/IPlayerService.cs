using api.Dtos.Player;

namespace api.Services
{
    public interface IPlayerService
    {
        Task UpdatePlayerAsync(PlayerSimplified player);
        Task<PlayerSimplified?> GetPlayerSimplifiedByIdAsync(string id);
        Task<List<PlayerSimplified>> GetAllPlayersSimplifiedAsync();
        Task<PlayerRegisterResponseDto?> RegisterPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> LoginPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> CreateGuestAsync();
    }
}
