<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title>Will Baker - Projects</title>
        
        <meta name="description" content="View some of the projects I have worked on in the past.">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style>
            body { overflow-y: scroll; }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
        <script src="/resources/scripts/pages/projects.js" defer></script>
    </head>

    <body>
        <?php require_once(PAGE_NAV); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1>Projects</h1>
            </div>
        </header>
        <main>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="text-centered">
                    <img src="/resources/images/loading-icon.svg" width="36" height="36" data-loading-icon>
                </div>
                <div class="projects-container"></div>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>