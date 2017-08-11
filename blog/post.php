<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

function leave()
{
    if (isset($connection))
        $connection->close();
    header("Location: /blog/");
    exit;
}

if (isset($_GET["id"]))
{
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_BlogDatabase");
    
    if (!$connection) leave();
    
    $sql = 'SELECT * FROM BlogPosts WHERE BlogID=' . getSecureText($_GET["id"], $connection, TRUE);
    $result = $connection->query($sql);
    
    if ($result->num_rows == 1)
    {
        $post = $result->fetch_assoc();
        $connection->close();
    }
    else leave();
}
else leave();

?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | <?php echo $post["Title"] ?></title>
        
        <?php printHead(); ?>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header"><?php echo $post["Title"] ?></h1>
                    </div>
                </section>
                <section class="cell-row section title-bar">
                    <div class="cell l12 vpadding-small hpadding-small bg-theme-d4">
                        <p class="clearfix">
                            <span class="float-l">
                                <a class="return-link" href="/blog/">To blogs page...</a>
                            </span>
                            <span class="float-r">
                                <strong><?php echo (new DateTime($post["EntryDate"]))->format("d/m/Y") ?></strong> <?php echo (new DateTime($post["EntryDate"]))->format("H:i") ?>
                            </span>
                        </p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <?php echo getAllowedHTML($post["Content"]) ?>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>