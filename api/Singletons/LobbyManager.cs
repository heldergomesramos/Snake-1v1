using api.Dtos.Player;
using api.Models;

namespace api.Singletons
{
    public static class LobbyManager
    {
        private static readonly object _lock = new();
        private static Lobby? _currentLobby = null;
        private static readonly List<Lobby> _allLobbies = [];

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

        public static void AddCurrentLobby()
        {
            lock (_lock)
            {
                if (_currentLobby != null)
                    _allLobbies.Add(_currentLobby);
            }
        }

        public static Lobby? JoinPublicLobby(PlayerRegisterResponseDto dto)
        {
            lock (_lock)
            {
                if (string.IsNullOrWhiteSpace(dto.Username))
                    return null;

                if (_currentLobby == null || _currentLobby.IsFull)
                {
                    _currentLobby = new Lobby(dto);
                    AddLobby(_currentLobby);
                }
                else
                {
                    _currentLobby.AddPlayer(dto);
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
    }
}