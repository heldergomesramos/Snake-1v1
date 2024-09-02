using api.Dtos.Lobby;
using api.Dtos.Player;
using api.Models;

namespace api.Mappers
{
    public static class LobbyMappers
    {
        public static PrivateLobbyResponseDto ToResponseDto(PrivateLobby lobby)
        {
            return new PrivateLobbyResponseDto
            {
                LobbyId = lobby.LobbyId,
                Player1 = lobby.Player1 == null ? null : PlayerMappers.ToResponseDto(lobby.Player1),
                Player2 = lobby.Player2 == null ? null : PlayerMappers.ToResponseDto(lobby.Player2),
                GameStarted = lobby.GameStarted,
                GameSettings = lobby.GameSettings,
                Code = lobby.Code
            };
        }
    }
}