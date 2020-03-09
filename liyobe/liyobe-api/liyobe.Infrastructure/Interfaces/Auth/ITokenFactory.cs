namespace liyobe.Infrastructure.Interfaces.Auth
{
    public interface ITokenFactory
    {
        string GenerateToken(int size = 32);
    }
}