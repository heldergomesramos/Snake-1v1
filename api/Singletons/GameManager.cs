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

        public static Game CreateGame(Lobby lobby)
        {
            var game = new Game(lobby);
            _games.Add(game);
            return game;
        }

        public static void RemoveGame(string gameId)
        {
            _games.RemoveAll(x => x.GameId == gameId);
        }
    }
}