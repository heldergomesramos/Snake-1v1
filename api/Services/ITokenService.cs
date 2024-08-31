using api.Models;

namespace api.Services
{
    public interface ITokenService
    {
        string CreateToken(Player user);
    }
}