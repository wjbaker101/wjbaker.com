using backend.Core.Type;
using System.Text.RegularExpressions;

namespace backend.Core.Services;

public static class SlugService
{
    public static Result<string> FromText(string text, string? originalSlug = null)
    {
        if (originalSlug != null)
            return Result<string>.Of(originalSlug);

        if (string.IsNullOrWhiteSpace(text))
            return Result<string>.Failure("Url slug cannot be blank, please try again.");

        var removedSpaces = text.ToLower();
        string previousValue;
        do
        {
            previousValue = removedSpaces;
            removedSpaces = removedSpaces.Replace("  ", " ");
        }
        while (removedSpaces != previousValue);

        var preSanitised = removedSpaces.Replace(" ", "-");
        var sanitised = Regex.Replace(preSanitised, @"[^\w\d\-]+", "");

        if (sanitised.Length == 0)
            return Result<string>.Failure("Unable to create Url slug.");

        return Result<string>.Of(sanitised);
    }
}