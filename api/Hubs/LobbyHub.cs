using api.Dtos.Lobby;
using api.Mappers;
using api.Models;
using api.Services;
using api.Singletons;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace api.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly IPlayerService _playerService;
        private readonly IHubContext<LobbyHub> _hubContext;

        public LobbyHub(IPlayerService playerService, IHubContext<LobbyHub> hubContext)
        {
            _playerService = playerService;
            _hubContext = hubContext;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                var playerId = httpContext.Request.Query["playerId"].ToString();
                await PlayerManager.AddConnectionAsync(playerId, Context.ConnectionId, _playerService);
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
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player != null)
            {
                await LobbyManager.LeavePrivateLobby(player.PlayerId, player.LobbyId, _hubContext);
                player.LobbyId = string.Empty;
                await _playerService.UpdatePlayerAsync(player);
                PlayerManager.RemoveConnection(Context.ConnectionId);
                Console.WriteLine($"Player {player.PlayerId} disconnected\n");
            }
            else
                Console.WriteLine("PROBLEM!!! player disconnected is null whaaaat");
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

        public async Task UpdatePlayerInLobby(string playerId, string lobbyId, int color, int ability)
        {
            Console.WriteLine("\nReceived UpdatePlayerInLobby for player: " + playerId + " in lobby: " + lobbyId + " color: " + color + " ability: " + ability);

            var lobby = LobbyManager.GetPrivateLobbyById(lobbyId);
            if (lobby == null)
                return;

            var player = LobbyManager.GetPlayerInLobbyByLobbyObj(playerId, lobby);
            if (player == null)
                return;

            player.Ability = Math.Clamp(ability, 0, 2);
            player.Color = Math.Clamp(color, 0, 7);

            await Clients.Group(lobbyId).SendAsync("LobbyUpdated", LobbyMappers.ToResponseDto(lobby));
            await _playerService.UpdatePlayerAsync(player);
        }

        public async Task StartGame(string lobbyId)
        {
            Console.WriteLine("\nStart Game of lobby: " + lobbyId);

            var lobby = LobbyManager.GetPrivateLobbyById(lobbyId);
            if (lobby == null)
                return;
            lobby.GameStarted = true;
            var game = GameManager.CreateGame(lobby);

            if (lobby.Player1 != null)
                lobby.Player1.GameId = game.GameId;

            if (lobby.Player2 != null)
                lobby.Player2.GameId = game.GameId;

            Console.WriteLine("Send this game: " + game.GameId);
            await Clients.Group(lobbyId).SendAsync("StartGame", game);
        }

        public async Task LeaveGame(string playerId, string gameId)
        {
            Console.WriteLine("Leave Game: " + gameId + " by: " + playerId);
            var game = GameManager.GetGameByGameId(gameId);
            if (game == null)
                return;
            var lobby = game.Lobby;
            await Clients.Group(lobby.LobbyId).SendAsync("LeaveGame");
            var player1 = lobby.Player1;
            if (player1 != null)
            {
                player1.LobbyId = string.Empty;
                player1.GameId = string.Empty;
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(player1.PlayerId);
                if (connectionId != null)
                    await Groups.RemoveFromGroupAsync(connectionId, lobby.LobbyId);
            }
            var player2 = lobby.Player2;
            if (player2 != null)
            {
                player2.LobbyId = string.Empty;
                player2.GameId = string.Empty;
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(player2.PlayerId);
                if (connectionId != null)
                    await Groups.RemoveFromGroupAsync(connectionId, lobby.LobbyId);
            }
            GameManager.RemoveGame(gameId);
            LobbyManager.RemovePrivateLobby(lobby.LobbyId);
        }

        /* Static Methods */

        public static async Task AddPlayerToLobby(string playerId, string lobbyId, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            Console.WriteLine($"\n[HUB] Add {playerId} To {lobbyId}");
            var connectionId = PlayerManager.GetConnectionIdByPlayerId(playerId);
            if (string.IsNullOrEmpty(connectionId))
                return;
            await hubContext.Groups.AddToGroupAsync(connectionId, lobbyId);
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }

        public static async Task UpdateLobby(string lobbyId, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }
    }
}
