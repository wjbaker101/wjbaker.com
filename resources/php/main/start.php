<?php

start();

function start()
{
    definePageLayout();
    
    define('LINK_REL', 'noopener noreferrer');
}

function definePageLayout()
{
    define('PAGE_META', $_SERVER['DOCUMENT_ROOT'] . '/resources/php/page/meta.php');

    define('PAGE_STYLE', $_SERVER['DOCUMENT_ROOT'] . '/resources/php/page/style.php');

    define('PAGE_SCRIPTS', $_SERVER['DOCUMENT_ROOT'] . '/resources/php/page/scripts.php');

    define('PAGE_NAV', $_SERVER['DOCUMENT_ROOT'] . '/resources/php/page/nav.php');

    define('PAGE_FOOTER', $_SERVER['DOCUMENT_ROOT'] . '/resources/php/page/footer.php');
}

?>