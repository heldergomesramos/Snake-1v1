using api.Dtos.Lobby;
using api.Models;

namespace api.Mappers
{
    public static class LobbyMappers
    {
        public static LobbyResponseDto ToResponseDto(GenericLobby lobby)
        {
            return new LobbyResponseDto
            {
                Player1 = PlayerMappers.PlayerSimplifiedToPlayerClient(lobby.Player1),
                Player2 = PlayerMappers.PlayerSimplifiedToPlayerClient(lobby.Player2),
                GameSettings = lobby.GameSettings,
                Code = lobby.Code
            };
        }
    }
}