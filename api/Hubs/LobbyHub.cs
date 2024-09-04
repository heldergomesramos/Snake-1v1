using api.Dtos.Lobby;
using api.Models;
using api.Singletons;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace api.Hubs
{
    public class LobbyHub : Hub
    {
        private static Dictionary<string, string> _playerConnections = [];

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"\nConnection from: {Context.ConnectionId}\n");
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                Console.WriteLine("\nhttp Context is not null, http. context: " + httpContext);
                var playerId = httpContext.Request.Query["playerId"].ToString();
                Console.WriteLine("\nPlayer Id: " + playerId);
                Console.WriteLine("Dictionary: " + _playerConnections);
                if (_playerConnections == null)
                {
                    _playerConnections = [];
                    Console.WriteLine("_playerConnections is null, create a new One");
                }
                _playerConnections[playerId] = Context.ConnectionId;
                Console.WriteLine($"\nPlayer {playerId} connected with ConnectionId: {Context.ConnectionId}\n");
            }
            else
            {
                Console.WriteLine($"\nNo valid query received from: {Context.ConnectionId}\n");
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var playerId = _playerConnections.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
            if (!string.IsNullOrEmpty(playerId))
            {
                Console.WriteLine("\nRemove: " + playerId + " from Dictionary, size before: " + _playerConnections.Count + "\n");
                _playerConnections.Remove(playerId);
            }

            Console.WriteLine($"\nPlayer {playerId} disconnected\n");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UpdateLobbySettings(string lobbyId, object newSettings)
        {
            Console.WriteLine("\n\nReceived UPDATE LOBBY SETTINGS for lobby: " + lobbyId);
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
            Console.WriteLine("Inside Hub 1");
            var connectionId = _playerConnections[playerId];
            Console.WriteLine("Inside Hub 2");
            if (connectionId == null) return;
            Console.WriteLine("Inside Hub 3");

            await hubContext.Groups.AddToGroupAsync(connectionId, lobbyId);
            Console.WriteLine("Inside Hub 4");
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
            Console.WriteLine("Inside Hub 5");
        }

        public static async Task UpdateLobby(string lobbyId, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }
    }
}