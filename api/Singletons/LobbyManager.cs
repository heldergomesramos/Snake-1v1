using System.IO.Compression;
using api.Controllers;
using api.Dtos.Player;
using api.Hubs;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.SignalR;

namespace api.Singletons
{
    public class LobbyManager
    {
        private static readonly Lazy<LobbyManager> instance = new(() => new LobbyManager());
        public static LobbyManager Instance => instance.Value;

        private static readonly object _lock = new();
        private static Lobby? _currentLobby = null;
        private static readonly List<PrivateLobby> _privateLobbies = [];
        private static readonly List<Lobby> _publicLobbies = [];

        public static List<Lobby> AllLobbiesCopy
        {
            get
            {
                lock (_lock)
                {
                    return _publicLobbies.Concat<Lobby>(_privateLobbies).ToList();
                }
            }
        }

        public static Lobby? CurrentLobby
        {
            get
            {
                lock (_lock)
                {
                    return _currentLobby;
                }
            }
            set
            {
                lock (_lock)
                {
                    _currentLobby = value;
                }
            }
        }

        public static PrivateLobby? GetPrivateLobbyById(string id)
        {
            return _privateLobbies.Find(x => x.LobbyId == id);
        }

        public static Lobby? JoinPublicLobby(PlayerRegisterResponseDto dto)
        {
            Console.WriteLine("Join Function Executed by " + dto.Username);
            lock (_lock)
            {
                if (string.IsNullOrWhiteSpace(dto.Username) || IsPlayerInLobby(dto.PlayerId, _currentLobby))
                    return null;

                if (_currentLobby == null)
                {
                    //_currentLobby = new Lobby(dto);
                    //dto.LobbyId = _currentLobby.LobbyId;
                    _publicLobbies.Add(_currentLobby);
                }
                else
                {
                    //_currentLobby.AddPlayer(dto);

                }

                if (_currentLobby.IsFull)
                {
                    _currentLobby.GameStarted = true;
                    var lobbyToReturn = _currentLobby;
                    _currentLobby = null;
                    return lobbyToReturn;
                }

                return _currentLobby;
            }
        }

        public static async Task<PrivateLobby?> CreatePrivateLobby(Player player, IHubContext<LobbyHub> hubContext)
        {
            var newLobby = new PrivateLobby(player);
            _privateLobbies.Add(newLobby);
            player.LobbyId = newLobby.LobbyId;

            await hubContext.Groups.AddToGroupAsync(player.Id, newLobby.LobbyId);

            return newLobby;
        }

        public static async Task<PrivateLobby?> JoinPrivateLobby(Player player, string code, IHubContext<LobbyHub> hubContext)
        {
            Console.WriteLine("Join Private Lobby by: " + player.UserName + " and code: " + code);
            var lobbyFound = _privateLobbies.Find(x => x.Code == code);
            if (lobbyFound == null)
                return null;
            Console.WriteLine("Lobby Found: " + lobbyFound.LobbyId);
            if (lobbyFound.Player1 == null)
                lobbyFound.Player1 = player;
            else if (lobbyFound.Player2 == null)
                lobbyFound.Player2 = player;
            else
                return null;
            Console.WriteLine("Lobby is not full, so he got through");
            player.LobbyId = lobbyFound.LobbyId;

            var lobbyDto = LobbyMappers.ToResponseDto(lobbyFound);

            await hubContext.Clients.Group(lobbyFound.LobbyId).SendAsync("LobbyUpdated", lobbyDto);
            await hubContext.Groups.AddToGroupAsync(player.Id, lobbyFound.LobbyId);

            return lobbyFound;
        }

        public static void DeleteAllLobbies()
        {
            lock (_lock)
            {
                _privateLobbies.Clear();
                _publicLobbies.Clear();
                _currentLobby = null;
            }
        }

        public static bool IsPlayerInLobby(string playerId, Lobby lobby)
        {
            if (lobby == null)
                return false;
            return lobby != null && ((lobby.Player1 != null && lobby.Player1.Id == playerId) || (lobby.Player2 != null && lobby.Player2.Id == playerId));
        }
    }
}