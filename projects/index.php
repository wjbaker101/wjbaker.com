<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php Page::meta(); ?>
        
        <title>Will Baker - Projects</title>
        
        <meta name="description" content="View some of the projects I have worked on in the past.">
        
        <?php Page::style(); ?>
        
        <style>
            body { overflow-y: scroll; }
            
            .cell-row.project-container { border-spacing: 0; }
            
            img[src="/resources/images/icons/projects.svg"]
            {
                width: 128px;
                height: 128px;
                padding: 30px;
                background-color: #176bc0;
                background-color: var(--theme);
            }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php Page::scripts(); ?>
        
        <script src="/resources/scripts/pages/projects.js" defer></script>
    </head>

    <body>
        <?php Page::nav(); ?>
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
                <div class="projects-container hpadding-small"></div>
                <?php //include($_SERVER['DOCUMENT_ROOT'] . '/resources/php/include/projects.php'); ?>
            </div>
        </main>
        <?php Page::footer(); ?>
    </body>
</html>