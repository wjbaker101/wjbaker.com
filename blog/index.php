<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title>Will Baker - Blog</title>
        
        <meta name="description" content="Read what ideas and thoughts I have.">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style>
            body { overflow-y: scroll; }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
        <script src="/resources/scripts/pages/blog-posts.js"></script>
    </head>
    
    <body>
        <?php require_once(PAGE_NAV); ?>
        <main>
            <header>
                <div class="content-width">
                    <h1>Blog</h1>
                </div>
            </header>
            <article>
                <div class="content-width">
                    <div class="hpadding-small text-centered">
                        <img src="/resources/images/loading-icon.svg" width="36" height="36" data-loading-icon>
                    </div>
                    <div class="post-container"></div>
                </div>
            </article>
            <?php require_once(PAGE_FOOTER); ?>
        </main>
    </body>
</html>