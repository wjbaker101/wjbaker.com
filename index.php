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
        <?php Page::meta(); ?>
        
        <title>Will Baker - Home</title>
        
        <meta name="description" content="Welcome to wjbaker.com, my personal website.">
        
        <?php Page::style(); ?>
        
        <style>
            .timeline-container
            {
                position: relative;
            }
            
            .timeline-container::before
            {
                content: '';
                width: 1px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                background-color: var(--dark-grey);
            }
            
            .timeline-container .article
            {
                width: 50%;
                text-align: right;
            }
            
            .timeline-container .article:nth-child(even)
            {
                text-align: left;
                margin-left: 50%;
            }
            
            .timeline-container .article .heading
            {
                position: relative;
                color: var(--theme);
            }
            
            .timeline-container .article .heading::after
            {
                content: '';
                display: table;
                position: absolute;
                top: 50%;
                left: -1.5rem;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 1px solid var(--theme);
                background-color: var(--pure-white);
                transform: translate(1px, -50%);
            }
            
            .timeline-container .article:nth-child(odd) .heading::after
            {
                left: auto;
                right: -1.5rem;
            }
            
            @media screen and (max-width: 540px)
            {
                .timeline-container::before
                {
                    left: 15px;
                }
                
                .timeline-container .article
                {
                    width: auto;
                    text-align: left;
                    margin-left: 15px;
                }
            
                .timeline-container .article:nth-child(even)
                {
                    margin-left: 15px;
                }
                
                .timeline-container .article:nth-child(odd) .heading::after
                {
                    left: -1.5rem;
                    right: auto;
                }
            }
        </style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php Page::scripts(); ?>
        
        <script></script>
    </head>
    
    <body>
        <?php Page::nav(); ?>
        <?php Page::header('wjbaker.com'); ?>
        <main>
            <div class="hpadding-small vpadding-mid">
                <div class="content-width">
                    <div class="cell-row">
                        <div class="cell l6 m12 cell-middle">
                            <h2>Welcome!</h2>
                            <p>My name is William Baker. I am a <?= getAge() ?> year old software developer with an interest in computing; especially programming, web development and software engineering.</p>
                            <p>I have been programming for many years working on a wide range of projects, many of which can be found on this website, and can be downloaded.</p>
                        </div>
                        <div class="cell l6 m12 cell-middle text-centered">
                            <img width="220" height="220" class="border-theme-mono circle" src="/resources/images/me.jpg">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-pure-white hpadding-small vpadding-mid">
                <div class="content-width">
                    <h2>My Timeline</h2>
                    <div class="timeline-container">
                        <div class="article padding-small">
                            <h4 class="heading"><?= (new DateTime())->format('dS F Y') ?></h4>
                            <p>Today!</p>
                        </div>
                        <div class="article padding-small">
                            <h4 class="heading">2nd July 2018</h4>
                            <p>Started my 3rd year placement at Yell.</p>
                        </div>
                        <div class="article padding-small">
                            <h4 class="heading">7th August 2017</h4>
                            <p>Started at Bradleys as Temporary IT Project Assistant.</p>
                        </div>
                        <div class="article padding-small">
                            <h4 class="heading">October 2016</h4>
                            <p>Started at Loughborough University.</p>
                            <p>The beginning of my Computer Science BSci course.</p>
                        </div>
                        <div class="article padding-small">
                            <h4 class="heading">September 2009</h4>
                            <p>Started at Oakwood Park Grammar School</p>
                        </div>
                        <span class="line"></span>
                    </div>
                </div>
            </div>
        </main>
        <?php Page::footer(); ?>
    </body>
</html>