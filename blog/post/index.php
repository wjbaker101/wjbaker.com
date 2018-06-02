<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php');

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/icons/icons.php');

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
        <?php Page::meta(); ?>
        
        <title><?= $post['Title'] ?></title>
        
        <meta name="description" content="">
        
        <?php Page::style(); ?>
        
        <style></style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php Page::scripts(); ?>
        
        <script></script>
    </head>
    
    <body>
        <?php Page::nav(); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1><?= $post['Title'] ?></h1>
            </div>
        </header>
        <main>
            <div class="nav-bar vpadding-small">
                <div class="content-width hpadding-small">
                    <div class="cell-row">
                        <div class="cell l7 s12 cell-middle">
                            <strong>Posted: </strong> <?= (new DateTime($post['EntryDate']))->format('d/m/Y H:i') ?><br>
                            <strong>By: </strong>William Baker
                        </div>
                        <div class="cell l5 s12 cell-middle text-right">
                            <a href="/blog/edit/<?= $post['BlogID'] ?>"><button class="grey-button"><?= Icons::edit() ?> Edit</button></a>
                            <a href="/blog/"><button>&larr; View more Posts</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="card padding-small">
                    <?= html_entity_decode($post['ContentHTML']) ?>
                </div>
            </div>
        </main>
        <?php Page::footer(); ?>
    </body>
</html>