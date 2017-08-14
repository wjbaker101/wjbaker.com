<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

$code = isset($_GET["code"]) ? $_GET["code"] : NULL;

switch ($code)
{
    case "400":
        $message = "Bad Request.";
        break;
    case "401":
        $message = "Unauthorized.";
        break;
    case "403":
        $message = "Forbidden.";
        break;
    case "404":
        $message = "Not Found.";
        break;
    case "500":
        $message = "Internal Server Error.";
        break;
    default:
        $message = "An error occurred.";
        break;
}

?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Error<?php echo " " . $code ?></title>
        
        <?php printHead(); ?>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">Error <?php echo $code ?></h1>
                    </div>
                </section>
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white text-centered">
                        <p><strong><?php echo $message ?></strong></p>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>