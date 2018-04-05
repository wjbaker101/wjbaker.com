<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/resources/php/icons/icons.php'); ?>

<nav class="bg-theme">
    <a class="home-button" href="/" title="Return to Homepage">
        <?= Icons::home() ?>
    </a>
    <ul class="links">
        <li>
            <a href="/projects/"><?= Icons::projects() ?>Projects</a>
        </li>
        <li>
            <a href="/blog/"><?= Icons::blog() ?>Blog</a>
        </li>
        <li>
            <a href="/user/login/"><?= Icons::user() ?>User</a>
        </li>
    </ul>

    <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/anton-saputro" title="Anton Saputro">Anton Saputro</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
</nav>