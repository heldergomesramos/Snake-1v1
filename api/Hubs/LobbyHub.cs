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
                if (player.GameId != string.Empty)
                {
                    await LeaveGame(player.PlayerId, player.GameId);
                }
                await _playerService.UpdatePlayerAsync(player);
                PlayerManager.RemoveConnection(Context.ConnectionId);
                Console.WriteLine($"Player {player.PlayerId} disconnected\n");
            }
            else
                Console.WriteLine("PROBLEM!!! player disconnected is null");
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
            await Clients.Group(lobbyId).SendAsync("StartGame", game.ToResponseDto());

            _ = Task.Run(() => game.StartGameLoop(async (gameState) =>
               {
                   Console.WriteLine("Broadcast game state: " + gameState);
                   Console.WriteLine("New Time being sent: " + gameState.ToResponseDto().Time);
                   try
                   {
                       await _hubContext.Clients.Group(lobbyId).SendAsync("UpdateGameState", gameState.ToResponseDto());
                   }
                   catch (Exception ex)
                   {
                       Console.WriteLine("Exception during SendAsync:");
                       Console.WriteLine(ex.ToString()); // Print exception details
                   }
               }));
        }

        public void UpdateDirectionCommand(string playerId, string gameId, char direction)
        {
            Console.WriteLine("Received update direction command from: " + playerId + " for game: " + gameId + " with direction: " + direction);
            GameManager.UpdateDirectionCommand(playerId, gameId, direction);
        }

        public async Task LeaveGame(string playerId, string gameId)
        {
            Console.WriteLine("Leave Game: " + gameId + " by: " + playerId);
            var game = GameManager.GetGameByGameId(gameId);
            if (game == null)
            {
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(playerId);
                if (connectionId == null)
                    return;
                await Clients.Client(connectionId).SendAsync("LeaveGame");
                var player = PlayerManager.GetPlayerSimplifiedByPlayerId(playerId);
                if (player == null)
                    return;
                player.LobbyId = string.Empty;
                player.GameId = string.Empty;
                return;
            }

            game.HandleDisconnection(playerId);
            var lobby = game.Lobby;
            var leavingPlayer = lobby.Player1?.PlayerId == playerId ? lobby.Player1 : lobby.Player2;
            var remainingPlayer = lobby.Player1?.PlayerId != playerId ? lobby.Player1 : lobby.Player2;

            // Notify the player who is leaving
            if (leavingPlayer != null)
            {
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(leavingPlayer.PlayerId);
                if (connectionId != null)
                {
                    await Clients.Client(connectionId).SendAsync("LeaveGame");
                    await Groups.RemoveFromGroupAsync(connectionId, lobby.LobbyId);
                }

                leavingPlayer.LobbyId = string.Empty;
                leavingPlayer.GameId = string.Empty;
            }

            // Notify the remaining player with the updated game state
            if (remainingPlayer != null)
            {
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(remainingPlayer.PlayerId);
                if (connectionId != null)
                {
                    await Clients.Client(connectionId).SendAsync("UpdateGameState", game.ToResponseDto());
                    await Clients.Client(connectionId).SendAsync("RematchResponse", "disabled");
                    await Groups.RemoveFromGroupAsync(connectionId, lobby.LobbyId);
                }

                remainingPlayer.LobbyId = string.Empty;
                remainingPlayer.GameId = string.Empty;
            }

            GameManager.RemoveGame(gameId);
            LobbyManager.RemovePrivateLobby(lobby.LobbyId);
        }

        public async Task AskRematch(string playerId, string gameId)
        {
            Console.WriteLine("Ask Rematch from: " + playerId);
            var client = PlayerManager.GetConnectionIdByPlayerId(playerId);
            if (client == null)
                return;
            var game = GameManager.GetGameByGameId(gameId);
            if (game == null || game.Lobby.Player1 == null || game.Lobby.Player2 == null)
            {
                await Clients.Client(client).SendAsync("RematchResponse", "disabled");
                return;
            }
            game.WantsRematch(playerId);
            if (game.Player1WantsRematch && game.Player2WantsRematch)
            {
                GameManager.RemoveGame(gameId);
                await StartGame(game.Lobby.LobbyId);
            }
            else
            {
                bool wantsRematch = game.Lobby.Player1.PlayerId == playerId ? game.Player1WantsRematch : game.Player2WantsRematch;
                await Clients.Client(client).SendAsync("RematchResponse", wantsRematch ? "locked-in" : "normal");
            }
        }

        public async Task PlayAgain(string playerId, string gameId)
        {
            Console.WriteLine("Play Again from: " + playerId);
            var game = GameManager.GetGameByGameId(gameId);
            if (game == null)
            {
                Console.WriteLine("Game is null, there is a problem");
                return;
            }
            GameManager.RemoveGame(gameId);
            await StartGame(game.Lobby.LobbyId);
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
