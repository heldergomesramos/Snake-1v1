using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _config = config;
            var cfg = _config["JWT:SigningKey"];
            if (cfg != null)
                _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg));
            else
                _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("a")); // This will never happen (its only here to avoid warnings)
        }

        public string CreateToken(Player user)
        {
            if (user == null || string.IsNullOrEmpty(user.UserName))
                return string.Empty;
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.GivenName, user.UserName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}