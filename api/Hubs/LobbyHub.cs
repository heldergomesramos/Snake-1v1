using api.Dtos.Lobby;
using api.Models;
using api.Services;
using api.Singletons;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace api.Hubs
{
    public class LobbyHub : Hub
    {
        private static readonly ConcurrentDictionary<string, string> _playerConnections = new();

        private readonly IPlayerService _playerService;

        public LobbyHub(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"\nConnection from: {Context.ConnectionId}");
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                var playerId = httpContext.Request.Query["playerId"].ToString();
                if (_playerConnections == null)
                    _playerConnections = [];
                _playerConnections[playerId] = Context.ConnectionId;
                Console.WriteLine($"Player {playerId} connected with ConnectionId: {Context.ConnectionId}");
            }
            else
            {
                Console.WriteLine($"No valid query received from: {Context.ConnectionId}");
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var playerId = _playerConnections.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
            if (!string.IsNullOrEmpty(playerId))
            {
                var player = await _playerService.GetPlayerByIdAsync(playerId);
                if (player == null)
                    return;

                /* TO IMPLEMENT: Get the lobbyif associated if not empty, then get the lobby itself using the LobbyManager, remove the player from the lobby (either player1 or player2, check if lobby is empty, if yes remove the lobby from the list, else keep it but notify the other player via signalR with the updated lobby using "LobbyUpdated") */
                player.LobbyId = string.Empty;
                await _playerService.UpdatePlayerAsync(player);

                _playerConnections.Remove(playerId);
            }

            Console.WriteLine($"Player {playerId} disconnected\n");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UpdateLobbySettings(string lobbyId, object newSettings)
        {
            Console.WriteLine("\nReceived UpdateLobbySettings for lobby: " + lobbyId);
            var newGameSettings = GameSettings.ObjectToGameSettings(newSettings);
            if (newGameSettings == null)
                return;
            var updatedLobby = LobbyManager.UpdateLobbySettings(lobbyId, newGameSettings);

            if (updatedLobby != null)
                await Clients.Group(lobbyId).SendAsync("LobbyUpdated", updatedLobby);
        }

        /* Static Methods */

        public static async Task AddPlayerToLobby(string playerId, string lobbyId, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            Console.WriteLine($"\n[HUB] Add {playerId} To {lobbyId}");
            var connectionId = _playerConnections[playerId];
            if (connectionId == null) return;

            await hubContext.Groups.AddToGroupAsync(connectionId, lobbyId);
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }

        public static async Task UpdateLobby(string lobbyId, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }

        public static async Task RemovePlayerFromLobby(string playerId, string lobbyId, object lobbyUpdated, IHubContext<LobbyHub> hubContext)
        {
            if (!_playerConnections.TryGetValue(playerId, out var connectionId))
                return;

            await hubContext.Groups.RemoveFromGroupAsync(connectionId, lobbyId);
            Console.WriteLine($"[DEBUG] Removed player {playerId} from group {lobbyId}");

            if (lobbyUpdated == null)
            {
                Console.WriteLine($"[DEBUG] No players left in lobby {lobbyId}. No updates will be sent.");
                return;
            }

            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyUpdated);
            Console.WriteLine($"[DEBUG] Sent LobbyUpdated to group {lobbyId}");
        }
    }
}