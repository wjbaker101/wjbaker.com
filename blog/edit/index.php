<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php');

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

if (!isset($_GET['id']))
{
    header('Location: /blog/');
    exit;
}

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
            #edit-content-container
            {
                border-color: #176bc0;
                border-color: var(--theme, #176bc0);
            }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
        <script src="/resources/external/ckeditor/ckeditor.js" defer></script>
        
        <script>
            window.addEventListener('load', () => { CKEDITOR.inline('edit-content-container') });
            
            window.addEventListener('load', () =>
            {
                const confirmButton = document.querySelector('.confirm-button');
                
                const setLoading = (loading) =>
                {
                    confirmButton.classList.toggle('loading', loading);
                    confirmButton.disabled = loading;
                };
                
                confirmButton.addEventListener('click', () =>
                {
                    const parameters =
                    {
                        id: <?= $post['BlogID'] ?>,
                        title: encodeURI(document.querySelector('[name=title]').value),
                        content: encodeURI(CKEDITOR.instances['edit-content-container'].getData()),
                    };
                    
                    const options =
                    {
                        url: '/resources/php/query/update-blog-post.php',
                        method: 'POST',
                        parameters: parameters,
                    };
                    
                    const requestUpdate = wjbaker.ajax(options);
                    
                    setLoading(true);
                    
                    requestUpdate.then((response) =>
                    {
                        console.log(response);
                        
                        setLoading(false);
                    })
                    .catch((error) =>
                    {
                        console.log(error);
                        
                        setLoading(false);
                    });
                });
            });
        </script>
    </head>
    
    <body>
        <?php require_once(PAGE_NAV); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1 class="column-container">
                    <input class="column l12" name="title" type="text" value="<?= $post['Title'] ?>">
                </h1>
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
                            <a href="/blog/post/<?= $post['BlogID'] ?>/<?= $post['TitleURL'] ?>/"><button class="grey-button">&larr; Return to Post</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-width hpadding-small vpadding-mid">
                <div id="edit-content-container" class="card column-container padding-small" contenteditable="true">
                    <?= html_entity_decode($post['ContentHTML']) ?>
                </div>
                <div class="card padding-small">
                    <h2>Confirm</h2>
                    <p>Press the button to complete the creation process.</p>
                    <p><button class="confirm-button">Confirm</button></p>
                    <p class="output-message"></p>
                </div>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>