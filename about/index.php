<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | About Me</title>
        
        <?php printHead(); ?>
        
        <style>
            .timeline-container article
            {
                width: 50%;
                display: table;
                padding-top: 2em;
                padding-bottom: 2em;
                border-width: 0;
                border-style: solid;
                border-color: #176bc0;
            }
            
            .timeline-container article:nth-child(odd)
            {
                text-align: right;
                border-right-width: 1px;
                padding-right: 30px;
            }
            
            .timeline-container article:nth-child(even)
            {
                border-left-width: 1px;
                padding-left: 30px;
                margin-left: -1px;
                transform: translateX(100%);
            }
            
            .timeline-container article h3
            {
                position: relative;
            }
            
            .timeline-container article h3:after
            {
                content: '';
                width: 1em;
                height: 1em;
                position: absolute;
                top: 0.25em;
                border: 1px solid #176bc0;
                border-radius: 50%;
                background-color: #fff;
            }
            
            .timeline-container article:nth-child(odd) h3:after
            {
                right: -2.125em;
            }
            
            .timeline-container article:nth-child(even) h3:after
            {
                left: -2.125em;
            }
        </style>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">About</h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l6 m12 cell-middle vpadding-large hpadding-regular bg-theme-d5">
                        <p>My name is William Baker. I am an 18 year old software developer with an interest in computing; especially programming, web development and software engineering. I have been programming for many years doing small tasks to keep my interest fresh. However, I have done some larger scale projects, many of which can be <a class="page-link-underline" href="/projects/">found on this website</a>, and can be downloaded.</p>
                    </div>
                    <div class="cell l6 m12 cell-middle vpadding-large hpadding-regular bg-white">
                        <div class="my-face"></div>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Programming</h2>
                        <p>Languages I am most proficient at are:</p>
                        <ol>
                            <li>C#</li>
                            <li>Java</li>
                            <li>JavaScript</li>
                            <li>PHP</li>
                        </ol>
                        <p>These are the languages I know the best and are the most comfortable at using.</p>
                        <p>Source code for projects can be found on my <a class="page-link-underline" href="https://github.com/wjbaker101" target="_blank">GitHub</a>.</p>
                        <p>Visit my <a class="page-link-underline" href="/about/programming.php">programming</a> page for more info.</p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2 class="text-centered">My Events Timeline</h2>
                        <div class="timeline-container">
                            <article>
                                <h3>Today</h3>
                            </article>
                            <article>
                                <h3>7th August 2017</h3>
                                <p>Started at Bradleys as Temporary IT Project Assistant.</p>
                            </article>
                            <article>
                                <h3>October 2016</h3>
                                <p>Started at Loughborough University.</p>
                                <p>The beginning of my Computer Science BSci course.</p>
                            </article>
                            <article>
                                <h3>September 2009</h3>
                                <p>Started at Oakwood Park Grammar School.</p>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>