using System.Collections.Concurrent;
using api.Dtos.Player;
using api.Mappers;
using api.Services;

namespace api.Singletons
{
    public class PlayerManager
    {
        private static ConcurrentDictionary<string, PlayerSimplified> _playerConnections = new();
        private static List<PlayerSimplified> _waitingGuests = []; //Guests without yet a connection, they will be removed after signalR

        public static bool IsPlayerConnected(string playerId)
        {
            return _playerConnections.Values.Any(player => player.PlayerId == playerId);
        }

        public static List<PlayerClient>? GetAllConnectedPlayers()
        {
            List<PlayerClient> newList = [];
            foreach (var val in _playerConnections.Values)
            {
                var playerClient = PlayerMappers.PlayerSimplifiedToPlayerClient(val);
                if (playerClient != null)
                    newList.Add(playerClient);
            }
            return newList;
        }

        public static PlayerSimplified? GetPlayerSimplifiedByPlayerId(string playerId)
        {
            return _playerConnections.Values.FirstOrDefault(x => x.PlayerId == playerId);
        }

        public static string? GetConnectionIdByPlayerId(string playerId)
        {
            return _playerConnections.FirstOrDefault(x => x.Value.PlayerId == playerId).Key;
        }

        public static PlayerSimplified? GetPlayerSimplifiedByConnectionId(string connectionId)
        {
            return _playerConnections.TryGetValue(connectionId, out var player) ? player : null;
        }

        public static void PrepareGuestConnection(PlayerSimplified player)
        {
            _waitingGuests.Add(player);
        }

        public static async Task AddConnectionAsync(string playerId, string connectionId, IPlayerService playerService)
        {
            PlayerSimplified? player = null;
            var playerFound = _waitingGuests.FirstOrDefault(x => x.PlayerId == playerId);
            if (playerFound != null)
            {
                player = playerFound;
                _waitingGuests.Remove(playerFound);
            }
            else
                player = await playerService.GetPlayerSimplifiedByIdAsync(playerId);
            if (player != null)
                _playerConnections[connectionId] = player;
        }

        public static void RemoveConnection(string connectionId)
        {
            _playerConnections.Remove(connectionId, out var x);
            if (x == null)
                Console.WriteLine("Could not remove connection: " + connectionId);
        }
    }
}
