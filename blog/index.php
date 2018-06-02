<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php Page::meta(); ?>
        
        <title>Will Baker - Blog</title>
        
        <meta name="description" content="Read what ideas and thoughts I have.">
        
        <?php Page::style(); ?>
        
        <style>
            body { overflow-y: scroll; }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php Page::scripts(); ?>
        
        <script src="/resources/scripts/pages/blog-posts.js"></script>
    </head>
    
    <body>
        <?php Page::nav(); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1>Blog</h1>
            </div>
        </header>
        <main>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="text-centered">
                    <img src="/resources/images/loading-icon.svg" width="36" height="36" data-loading-icon>
                </div>
                <div class="post-container"></div>
            </div>
        </main>
        <?php Page::footer(); ?>
    </body>
</html>