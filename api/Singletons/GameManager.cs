using api.Models;

namespace api.Singletons
{
    public class GameManager
    {
        private static readonly List<Game> _games = new();

        public static Game? GetGameByGameId(string gameId)
        {
            return _games.Find(x => x.GameId == gameId);
        }

        public static Game CreateGame(GenericLobby lobby)
        {
            var game = new Game(lobby);
            _games.Add(game);
            return game;
        }

        public static void UpdateDirectionCommand(string playerId, string gameId, char direction)
        {
            GetGameByGameId(gameId)?.ReceiveDirectionCommand(playerId, direction);
        }

        public static void RemoveGame(string gameId)
        {
            _games.RemoveAll(x => x.GameId == gameId);
        }
    }
}