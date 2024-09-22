using System.Collections.Concurrent;
using api.Dtos.Lobby;
using api.Dtos.Player;
using api.Hubs;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.SignalR;

namespace api.Singletons
{
    public class PlayerManager
    {
        private static ConcurrentDictionary<string, PlayerSimplified> _playerConnections = new();

        public static bool IsPlayerConnected(string playerId)
        {
            return _playerConnections.Values.Any(player => player.PlayerId == playerId);
        }

        public static List<PlayerSimplified>? GetAllConnectedPlayers()
        {
            return [.. _playerConnections.Values];
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

        public static async Task AddConnectionAsync(string playerId, string connectionId, IPlayerService playerService)
        {
            var player = await playerService.GetPlayerSimplifiedByIdAsync(playerId);
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
