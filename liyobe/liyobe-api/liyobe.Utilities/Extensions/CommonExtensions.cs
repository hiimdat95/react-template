using System;
using System.Linq;

namespace liyobe.Utilities.Extensions
{
    public static class CommonExtensions
    {
        public static string GetNumberic(string value)
        {
            return new String(value.Where(Char.IsDigit).ToArray());
        }
    }
}