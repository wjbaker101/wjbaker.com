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
                        <h1>Sitemap</h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <ul>
                            <li>
                                <h2><a class="underline" href="/">Home</a></h2>
                                <p>Homepage for my website.</p>
                            </li>
                            <li>
                                <p><a class="underline" href="/about/">About</a></p>
                                <ul>
                                    <li><p><a class="underline" href="/about/programming.php">Programming</a></p></li>
                                </ul>
                            </li>
                            <li><p><a class="underline" href="/projects/">Projects</a></p></li>
                            <li><p><a class="underline" href="/blog/">Blog</a></p></li>
                            <li><p><a class="underline" href="/users/login.php">Login</a></p></li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>