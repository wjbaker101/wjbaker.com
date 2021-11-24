using backend.Core.Type;
using System.Text.RegularExpressions;

namespace backend.Core.Services;

public static class SlugService
{
    public static Result<string> FromText(string text, string? originalSlug = null)
    {
        if (originalSlug != null)
            return Result<string>.Of(originalSlug);

        var preSanitised = text.ToLower().Replace("  ", " ").Replace(" ", "-");
        var sanitised = Regex.Replace(preSanitised, @"[^\w\d\-]+", "");

        if (sanitised.Length == 0)
            return Result<string>.Failure("Unable to create Url slug.");

        return Result<string>.Of(sanitised);
    }
}