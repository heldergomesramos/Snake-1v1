using System.IO.Compression;
using api.Controllers;
using api.Dtos.Player;
using api.Models;
using api.Services;

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

        public static PrivateLobby? CreatePrivateLobby(Player player)
        {
            lock (_lock)
            {
                var newLobby = new PrivateLobby(player);
                _privateLobbies.Add(newLobby);
                player.LobbyId = newLobby.LobbyId;
                return newLobby;
            }
        }

        public static PrivateLobby? JoinPrivateLobby(Player player, string code)
        {
            lock (_lock)
            {
                var lobbyFound = _privateLobbies.Find(x => x.Code == code);
                if (lobbyFound == null)
                    return null;
                if (lobbyFound.Player1 == null)
                    lobbyFound.Player1 = player;
                else if (lobbyFound.Player2 == null)
                    lobbyFound.Player2 = player;
                else
                    return null;
                player.LobbyId = lobbyFound.LobbyId;
                return lobbyFound;
            }
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