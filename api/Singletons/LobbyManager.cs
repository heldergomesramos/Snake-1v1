using api.Controllers;
using api.Dtos.Player;
using api.Models;

namespace api.Singletons
{
    public static class LobbyManager
    {
        private static readonly object _lock = new();
        private static Lobby? _currentLobby = null;
        private static readonly List<Lobby> _allLobbies = [];

        // Returns copy of _allLobies
        public static List<Lobby> AllLobbies
        {
            get
            {
                lock (_lock)
                {
                    return [.. _allLobbies];
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

        public static void AddLobby(Lobby lobby)
        {
            lock (_lock)
            {
                _allLobbies.Add(lobby);
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
                    AddLobby(_currentLobby);
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

        public static void DeleteAllLobbies()
        {
            lock (_lock)
            {
                _allLobbies.Clear();
                _currentLobby = null;
            }
        }

        public static bool IsPlayerInLobby(string playerId, Lobby? lobby)
        {
            return lobby != null && (lobby.HostPlayerId == playerId || lobby.InviteePlayerId == playerId);
        }
    }
}