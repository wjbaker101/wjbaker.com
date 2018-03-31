<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title>Will Baker - Home</title>
        
        <meta name="description" content="Welcome to wjbaker.com, my personal website.">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style></style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
        <script></script>
    </head>
    
    <body>
        <?php require_once(PAGE_NAV); ?>
        <main>
            <header>
                <div class="content-width">
                    <h1>wjbaker.com</h1>
                </div>
            </header>
            <article>
                <div class="content-width">
                    <p>Welcome to my personal website!</p>
                </div>
            </article>
            <?php require_once(PAGE_FOOTER); ?>
        </main>
    </body>
</html>