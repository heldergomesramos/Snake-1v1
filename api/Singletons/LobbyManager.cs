using api.Dtos.Lobby;
using api.Dtos.Player;
using api.Hubs;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;

namespace api.Singletons
{
    public class LobbyManager
    {
        private static readonly object _lock = new();
        public static PlayerSimplified? PlayerInPublicQueue = null;
        private static readonly List<GenericLobby> _privateLobbies = [];
        private static readonly List<GenericLobby> _publicLobbies = [];

        public static List<GenericLobby> GetAllPrivateLobbies()
        {
            return _privateLobbies;
        }

        public static GenericLobby? GetPrivateLobbyById(string id)
        {
            return _privateLobbies.Find(x => x.LobbyId == id);
        }

        public static PlayerSimplified? GetPlayerInLobbyByLobbyId(string playerId, string lobbyId)
        {
            var lobby = _privateLobbies.Find(x => x.LobbyId == lobbyId);
            if (lobby == null)
                return null;
            if (lobby.Player1 != null && lobby.Player1.PlayerId == playerId)
                return lobby.Player1;
            else if (lobby.Player2 != null && lobby.Player2.PlayerId == playerId)
                return lobby.Player2;
            return null;
        }

        public static PlayerSimplified? GetPlayerInLobbyByLobbyObj(string playerId, GenericLobby lobby)
        {
            if (lobby == null)
                return null;
            if (lobby.Player1 != null && lobby.Player1.PlayerId == playerId)
                return lobby.Player1;
            else if (lobby.Player2 != null && lobby.Player2.PlayerId == playerId)
                return lobby.Player2;
            return null;
        }

        public static GenericLobby? JoinPublicLobby(PlayerSimplified player)
        {
            Console.WriteLine("Join Function Executed by " + player.Username);
            if (PlayerInPublicQueue == player)
                return null;
            else if (PlayerInPublicQueue == null)
            {
                PlayerInPublicQueue = player;
            }
            else
            {
                GenericLobby newLobby = new(PlayerInPublicQueue, player)
                {
                    GameSettings = GameSettings.RandomSettings()
                };
                _publicLobbies.Add(newLobby);
                PlayerInPublicQueue = null;
                return newLobby;
            }
            return null;
        }

        public static async Task<LobbyResponseDto?> CreatePrivateLobby(PlayerSimplified player, IHubContext<LobbyHub> hubContext)
        {
            var newLobby = new GenericLobby(player);
            _privateLobbies.Add(newLobby);
            player.Lobby = newLobby;
            var lobbyDto = LobbyMappers.ToResponseDto(newLobby);
            await LobbyHub.AddPlayerToLobby(player.PlayerId, newLobby, lobbyDto, hubContext);
            return lobbyDto;
        }

        public static async Task<LobbyResponseDto?> JoinPrivateLobby(PlayerSimplified player, string code, IHubContext<LobbyHub> hubContext)
        {
            var lobbyFound = _privateLobbies.Find(x => x.Code == code);
            if (lobbyFound == null || lobbyFound.GameStarted)
                return null;
            if (lobbyFound.Player1 == null)
                lobbyFound.Player1 = player;
            else if (lobbyFound.Player2 == null)
                lobbyFound.Player2 = player;
            else
                return null;
            player.Lobby = lobbyFound;
            var lobbyDto = LobbyMappers.ToResponseDto(lobbyFound);
            await LobbyHub.AddPlayerToLobby(player.PlayerId, lobbyFound, lobbyDto, hubContext);

            return lobbyDto;
        }

        public static async Task LeaveLobby(PlayerSimplified player, IHubContext<LobbyHub> hubContext)
        {
            if (player.Lobby == null)
                return;
            if (_publicLobbies.Contains(player.Lobby))
                await LeavePublicLobby(player.Lobby, hubContext);
            else if (_privateLobbies.Contains(player.Lobby))
                await LeavePrivateLobby(player.PlayerId, player.Lobby, hubContext);
        }

        public static async Task LeavePublicLobby(GenericLobby lobbyFound, IHubContext<LobbyHub> hubContext)
        {
            if (lobbyFound == null)
                return;
            _publicLobbies.Remove(lobbyFound);
            await hubContext.Clients.Group(lobbyFound.LobbyId).SendAsync("PlayerLeft");
            if (lobbyFound.Player1 != null)
            {
                var connection1 = PlayerManager.GetConnectionIdByPlayerId(lobbyFound.Player1.PlayerId);
                if (!string.IsNullOrEmpty(connection1))
                    await hubContext.Groups.RemoveFromGroupAsync(connection1, lobbyFound.LobbyId);
            }
            if (lobbyFound.Player2 != null)
            {
                var connection2 = PlayerManager.GetConnectionIdByPlayerId(lobbyFound.Player2.PlayerId);
                if (!string.IsNullOrEmpty(connection2))
                    await hubContext.Groups.RemoveFromGroupAsync(connection2, lobbyFound.LobbyId);
            }
        }

        public static async Task LeavePrivateLobby(string playerId, GenericLobby lobbyFound, IHubContext<LobbyHub> hubContext)
        {
            if (lobbyFound == null)
                return;
            if (lobbyFound.Player1 != null && lobbyFound.Player1.PlayerId == playerId)
                lobbyFound.Player1 = null;
            else if (lobbyFound.Player2 != null && lobbyFound.Player2.PlayerId == playerId)
                lobbyFound.Player2 = null;
            else
                return;

            if (lobbyFound.IsEmpty)
            {
                _privateLobbies.Remove(lobbyFound);
            }
            else
            {
                var updatedLobbyDto = LobbyMappers.ToResponseDto(lobbyFound);
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(playerId);
                if (string.IsNullOrEmpty(connectionId))
                    return;
                await hubContext.Groups.RemoveFromGroupAsync(connectionId, lobbyFound.LobbyId);
                await hubContext.Clients.Group(lobbyFound.LobbyId).SendAsync("LobbyUpdated", updatedLobbyDto);
            }
        }

        public static void RemovePublicLobby(GenericLobby lobby)
        {
            _publicLobbies.Remove(lobby);
        }

        public static void RemovePrivateLobby(GenericLobby lobby)
        {
            _privateLobbies.Remove(lobby);
        }

        // public static PrivateLobbyResponseDto? UpdatePrivateLobbySettings(GenericLobby lobby, GameSettings newSettings)
        // {
        //     if (lobby == null)
        //         return null;

        //     lobby.GameSettings = newSettings;
        //     return LobbyMappers.ToResponseDto(lobby);
        // }

        public static void DeleteAllLobbies()
        {
            _privateLobbies.Clear();
            _publicLobbies.Clear();
        }

        public static bool IsPlayerInLobby(string playerId, GenericLobby? lobby)
        {
            if (lobby == null)
                return false;
            return lobby.Player1?.PlayerId == playerId || lobby.Player2?.PlayerId == playerId;
        }
    }
}
