<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php');

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

$query = Query::getBlogPost($_GET['id']);

if ($query->getContents() === null || $query->getCode() !== 'success')
{
    header('Location: /blog/');
    exit;
}

$post = $query->getContents();

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title><?= $post['Title'] ?></title>
        
        <meta name="description" content="">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style>
            .nav-bar
            {
                border-bottom: 1px solid var(--dark-grey);
            }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
        <script></script>
    </head>
    
    <body>
        <?php require_once(PAGE_NAV); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1><?= $post['Title'] ?></h1>
            </div>
        </header>
        <main>
            <div class="nav-bar vpadding-small bg-white">
                <div class="content-width hpadding-small">
                    <span><a href="/blog/">&larr; Return to Blog</a></span>
                </div>
            </div>
            <div class="content-width hpadding-small vpadding-mid">
                <?= html_entity_decode($post['ContentHTML']) ?>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>