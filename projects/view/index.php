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
        
        <style></style>
        
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
                    <h2>About This Project</h2>
                    <?= $project['Description'] ?>
                </div>
                <div class="card padding-small">
                    <img src="/resources/images/projects/screenshots/<?= $project['ProjectID'] ?>.png">
                    <div class="note">
                        <p><?= $project['ScreenshotDescription'] ?></p>
                    </div>
                </div>
            </div>
            <div class="full-section">
                <div class="content-width hpadding-small vpadding-mid">
                    <div class="cell-row text-centered">
                        <div class="card cell l4 s12 padding-small">
                            <h3>View Source</h3>
                            <a href="<?= $project['GitHub'] ?>" target="_blank" rel="noopener noreferrer"><button><?= Icons::github() ?> GitHub</button></a>
                        </div>
                        <div class="card cell l4 s12 padding-small">
                            <h3>Download</h3>
                            <button><?= Icons::download() ?> Download</button>
                        </div>
                        <div class="card cell l4 s12 padding-small">
                            <h3>View Online</h3>
                            <button><?= Icons::view() ?> View</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="card padding-small">
                    <h2>Additional Information</h2>
                    <table>
                        <thead class="text-left">
                            <tr><th colspan="2">Project:</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Creation Date</th>
                                <td>08/07/2015</td>
                            </tr>
                            <tr>
                                <th>Completion Date</th>
                                <td>08/07/2015</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>Complete</td>
                            </tr>
                            <tr>
                                <th>Download File Size</th>
                                <td>900GB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>