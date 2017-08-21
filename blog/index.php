<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Blog</title>
        
        <?php printHead(); ?>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">Blog</h1>
                    </div>
                </section>
                <?php if ($user != NULL && $user["IsAdmin"] == 1) { ?>
                <section class="cell-row section title-bar">
                    <div class="cell l12 vpadding-small hpadding-small bg-theme-d4">
                        <p class="title-bar clearfix">
                            <span class="float-r">
                                <a class="site-nav" href="/blog/new-post.php"><i class="icon plus"></i> New Post</a>
                            </span>
                        </p>
                    </div>
                </section>
                <?php } ?>
                <?php
                
                require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
                
                $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_BlogDatabase");
                        
                $sql = 'SELECT * FROM BlogPosts ORDER BY EntryDate DESC';

                $result = $connection->query($sql);

                if ($result->num_rows > 0)
                {
                    $currentDate = "";
                    
                    while ($blog = $result->fetch_assoc())
                    {
                        $blogDate = (new DateTime($blog["EntryDate"]))->format("Y");
                        if ($currentDate != $blogDate)
                        {
                            echo "<div class=\"blog-container cell-row section scroll-fade-in\"><div class=\"cell l12 vpadding-regular hpadding-regular bg-theme\"><h1 class=\"text-centered\">{$blogDate}</h1></div></div>";
                            $currentDate = $blogDate;
                        }
                
                ?>
                <section class="blog-container cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2><?php echo $blog["Title"] ?></h2>
                        <?php echo getAllowedHTML($blog["PreviewText"]) ?>
                        <p><a href="/blog/post/<?php echo $blog["BlogID"] . "/" . $blog["HeaderTitle"] ?>"><button>Read</button></a></p>
                    </div>
                </section>
                <?php
                
                    }
                }
                else
                {
                
                ?>
                    
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white text-centered">
                        <p>Unable to load blog posts.</p>
                    </div>
                </section>
                <?php
                
                }
                
                ?>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>