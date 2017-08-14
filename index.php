<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | wjbaker.com</title>
        
        <?php printHead(); ?>
        
        <style></style>
        
        <script></script>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1>Welcome!</h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l7 m6 s12 vpadding-large hpadding-regular bg-white">
                        <p></p>
                    </div>
                    <div class="cell l5 m6 s12 vpadding-large hpadding-regular bg-theme-l5">
                        <h2><a href="/projects/">My Projects</a></h2>
                        <div class="section hpadding-small vpadding-small bg-white text-centered">
                            <a href="/projects/view/1/normal-distribution-graph">
                                <img src="/projects/assets/1/screenshot.jpg">
                                <h3>Normal Distribution Graph</h3>
                            </a>
                        </div>
                        <div class="section hpadding-small vpadding-small bg-white text-centered">
                            <a href="/projects/view/6/train-route-finder">
                                <img src="/projects/assets/6/screenshot.jpg">
                                <h3>Train Route Finder</h3>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>