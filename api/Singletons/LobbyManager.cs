using api.Dtos.Lobby;
using api.Dtos.Player;
using api.Hubs;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.SignalR;

namespace api.Singletons
{
    public class LobbyManager
    {
        private static readonly object _lock = new();
        private static GenericLobby? _currentLobby = null;
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

        public static GenericLobby? JoinPublicLobby(PlayerRegisterResponseDto dto)
        {
            Console.WriteLine("Join Function Executed by " + dto.Username);
            return null;
            // lock (_lock)
            // {
            //     if (string.IsNullOrWhiteSpace(dto.Username) || IsPlayerInLobby(dto.PlayerId, _currentLobby))
            //         return null;

            //     if (_currentLobby == null)
            //     {
            //         //_currentLobby = new Lobby(dto);
            //         //dto.LobbyId = _currentLobby.LobbyId;
            //         //_publicLobbies.Add(_currentLobby);
            //     }
            //     else
            //     {
            //         //_currentLobby.AddPlayer(dto);
            //     }

            //     if (_currentLobby.IsFull)
            //     {
            //         _currentLobby.GameStarted = true;
            //         var lobbyToReturn = _currentLobby;
            //         _currentLobby = null;
            //         return lobbyToReturn;
            //     }

            //     return _currentLobby;
            // }
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

        public static async Task LeavePrivateLobby(string playerId, string lobbyId, IHubContext<LobbyHub> hubContext)
        {
            var lobbyFound = GetPrivateLobbyById(lobbyId);
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
                RemovePrivateLobby(lobbyFound);
            }
            else
            {
                var updatedLobbyDto = LobbyMappers.ToResponseDto(lobbyFound);
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(playerId);
                if (string.IsNullOrEmpty(connectionId))
                    return;
                await hubContext.Groups.RemoveFromGroupAsync(connectionId, lobbyId);
                await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", updatedLobbyDto);
            }
        }

        // public static PrivateLobbyResponseDto? UpdatePrivateLobbySettings(GenericLobby lobby, GameSettings newSettings)
        // {
        //     if (lobby == null)
        //         return null;

        //     lobby.GameSettings = newSettings;
        //     return LobbyMappers.ToResponseDto(lobby);
        // }

        public static void RemovePrivateLobby(string lobbyId)
        {
            var lobby = _privateLobbies.FirstOrDefault(x => x.LobbyId == lobbyId);
            if (lobby != null)
                _privateLobbies.Remove(lobby);
        }


        public static void RemovePrivateLobby(GenericLobby lobby)
        {
            if (lobby != null)
                _privateLobbies.Remove(lobby);
        }


        public static void DeleteAllLobbies()
        {
            _privateLobbies.Clear();
            _publicLobbies.Clear();
            _currentLobby = null;
        }

        public static bool IsPlayerInLobby(string playerId, GenericLobby? lobby)
        {
            if (lobby == null)
                return false;
            return lobby.Player1?.PlayerId == playerId || lobby.Player2?.PlayerId == playerId;
        }
    }
}
