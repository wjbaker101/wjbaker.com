<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php');

/**
 * Calculates my age in years.
 * 
 * @return Integer The number of years I have lived.
 */
function getAge()
{
    $timezone = new DateTimeZone('Europe/London');
    
    $birthday = DateTime::createFromFormat('d/m/Y', '30/07/1998', $timezone);

    $today = new DateTime();

    return $birthday->diff($today)->y;
}

?>
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
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1>wjbaker.com</h1>
            </div>
        </header>
        <main>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="card padding-small">
                    <div class="cell-row">
                        <div class="cell l6 m12 cell-middle">
                            <h2>Welcome!</h2>
                            <p>My name is William Baker. I am a <?= getAge() ?> year old software developer with an interest in computing; especially programming, web development and software engineering.</p>
                            <p>I have been programming for many years working on a wide range of projects, many of which can be found on this website, and can be downloaded.</p>
                        </div>
                        <div class="cell l6 m12 cell-middle text-centered">
                            <img class="circle" src="/resources/images/me.jpg">
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>