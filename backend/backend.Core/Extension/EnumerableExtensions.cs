namespace backend.Core.Extension;

public static class EnumerableExtensions
{
    public static List<TResult> ConvertAll<TSource, TResult>(this IEnumerable<TSource> items, Func<TSource, int, TResult> selector)
    {
        return items
            .Select(selector)
            .ToList();
    }

    public static List<TResult> ConvertAll<TSource, TResult>(this IEnumerable<TSource> items, Func<TSource, TResult> selector)
    {
        return items
            .Select(selector)
            .ToList();
    }
}