<template>
    <div class="page-content">
        <h1>Literal Templates</h1>
        <p>Template Literals, aka Interpolated strings or expanded strings, are string literals which allow embedded variables.</p>
        <p>I will be looking into 3 languages, and how to construct one of these types of strings. Firstly,</p>
        <h2>JavaScript</h2>
        <p>A new feature since ES6, you are able to create a string containing variables and expressions without having to concatenate multiple strings.</p>
        <div class="code-block">
            <pre><code>const x = 5;
    const getX = () => x;

    // Variables:
    const output = `The value of x is ${x}`;
    // => 'The value of x is 5'

    // Expressions:
    const output = `The value of x is ${x + 1}`;
    // => 'The value of x is 6'

    // Function calls:
    const output = `The value of x is ${getX()}`;
    // => 'The value of x is 5'</code></pre>
        </div>
        <p>As you can see, you must enclose the string using the back-tick (rather than the traditional single or double quotes).</p>
        <p>Using back-ticks not only allows template literals, but has the added bonus of allowing the use of single and double quotes in the string without having to escape any characters. As long as you don’t want back-ticks inside the string! But you can still simply escape them: <code>const escaped = `\``.</code></p>
        <p>Furthermore! Back-ticks allow multi-line strings:</p>
        <div class="code-block">
            <pre><code>const html = `
        &lt;article&gt;
            &lt;h2&gt;${article.title}&lt;/h2&gt;
        &lt;/article&gt;
    `;</code></pre>
        </div>
        <p>There are some other features found in ES6, but I want to talk about some other programming languages. If you would like to learn more, I recommend reading the MDN page, found here: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">MDN Network</a>.</p>
        <h2>C#</h2>
        <p>New in C# 6.0, <strong>string interpolation</strong> allows you to do a similar thing to template literals.</p>
        <p>The syntax is slightly different, but still easy to use, and has some added bonus features:</p>
        <div class="code-block">
            <pre><code>double x = 7.123;

    // Variables:
    String s = $"The value of x is {x}";
    // => 'The value of x is 7.123'

    // Number Formatting:
    String s = $"The value of x to 2dp is {x:F2}";
    // => 'The value of x to 2dp is 7.12'</code></pre>
        </div>
        <p>Again, for more information visit <a href="https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interpolated-strings">Microsoft C# Docs</a>.</p>
        <h2>PHP</h2>
        <p>Lastly, I will be looking into a similar concept for PHP.</p>
        <p>Here’s the syntax:</p>
        <div class="code-block">
            <pre><code>$output = "The value of x is $x";

    $output = "The value of x is ${x}";

    $age = "The person is {$person->age} years old!";

    $age = "The person is ${person->age} years old!";</code></pre>
        </div>
        <p>For this to work you must use double quotes or HEREDOC.</p>
        <p>Using double quotes will also allow special characters to be written, like <code>\n</code> or <code>\t.</code></p>
        <p>Unfortunately, you cannot use functions inside the curly brackets.</p>
        <p>Hopefully this article has been helpful in the future. This will help you write cleaner and easier to read text when writing strings.</p>
        <p>Thanks for reading!</p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';

    export default {
        name: 'BlogTest',

        mixins: [ BaseRouteMixin ],
    }
</script>

<style lang="scss">
</style>
