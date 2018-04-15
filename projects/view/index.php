<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php');

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/icons/icons.php');

$query = Query::getProject($_GET['id']);

if ($query->getContents() === null || $query->getCode() !== 'success')
{
    header('Location: /projects/');
    exit;
}

$project = $query->getContents();

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title><?= $project['Title'] ?></title>
        
        <meta name="description" content="">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style>
            .nav-bar
            {
                background-color: var(--pure-white);
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
                <h1><?= $project['Title'] ?></h1>
            </div>
        </header>
        <main>
            <div class="nav-bar vpadding-small">
                <div class="content-width hpadding-small">
                    <div class="cell-row">
                        <div class="cell l5 s12 cell-middle text-right">
                            <a href="/projects/"><button class="grey-button">&larr; View more Projects</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="card padding-small">
                    <h2>What it's About</h2>
                    <?= $project['Description'] ?>
                </div>
                <div class="card padding-small">
                    <img src="/resources/images/projects/screenshots/<?= $project['ProjectID'] ?>.png">
                    <p class="note"><?= $project['ScreenshotDescription'] ?></p>
                </div>
            </div>
            <div class="bg-light-grey">
                <div class="content-width hpadding-small vpadding-mid">
                    <div class="cell-row text-centered">
                        <div class="card cell l4 s12 padding-small">
                            <p><button>View on GitHub</button></p>
                        </div>
                        <div class="card cell l4 s12 padding-small">
                            <p>View Online</p>
                        </div>
                        <div class="card cell l4 s12 padding-small">
                            <p>Download</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>