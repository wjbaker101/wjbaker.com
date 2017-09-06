<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Sitemap</title>
        
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
                        <h1 class="fancy-header">Sitemap</h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-regular hpadding-regular bg-white">
                        <div class="section vpadding-regular hpadding-small border-light-grey">
                            <h2><a href="/">Home</a></h2>
                            <p>Homepage for my website. Includes an overview of content.</p>
                        </div>
                        <div class="section vpadding-regular hpadding-small border-light-grey">
                            <h2><a href="/about/">About</a></h2>
                            <p>Information about me.</p>
                            <ul>
                                <li><a class="page-link-underline" href="/about/programming.php">Programming</a></li>
                            </ul>
                        </div>
                        <div class="section vpadding-regular hpadding-small border-light-grey">
                            <h2><a href="/projects/">Projects</a></h2>
                            <p>A collection of my programming related projects.</p>
                        </div>
                        <div class="section vpadding-regular hpadding-small border-light-grey">
                            <h2><a href="/users/login.php">Login</a></h2>
                            <p>A simple user account system, written in PHP.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>