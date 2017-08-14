<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

function leave()
{
    if (isset($connection))
        $connection->close();
    header ("Location: /projects/");
    exit;
}

if (isset($_GET["id"]))
{
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_ProjectDatabase");
    $sql = 'SELECT * FROM Projects WHERE ProjectID=' . $_GET["id"];
    $result = $connection->query($sql);
    
    if ($result->num_rows == 1)
    {
        $project = $result->fetch_assoc();
        $connection->close();
    }
    else leave();
}
else leave();

?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Project: <?php echo $project["Title"] ?></title>
        
        <?php printHead(); ?>
        
        <style>
            button.download:hover, button.download:focus
            {
                background-color: #cae1f9;
            }
        </style>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header"><?php echo $project["Title"] ?></h1>
                    </div>
                </section>
                <section class="cell-row section title-bar">
                    <div class="cell l12 vpadding-small hpadding-small bg-theme-d4">
                        <p><a class="return-link" href="/projects/">To projects page...</a></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white text-centered">
                        <h2>Description</h2>
                        <?php echo $project["Description"] ?>
                    </div>
                </section>
                <?php
    
                $screenshotUrl = '/projects/assets/' . $project["ProjectID"] . '/screenshot.jpg';
                            
                if (file_exists($_SERVER['DOCUMENT_ROOT'] . $screenshotUrl))
                {
                
                ?>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-mid hpadding-regular bg-white text-centered">
                        <figure class="screenshot">
                            <div class="magnify">
                                <a target="_blank" href="<?php echo $screenshotUrl ?>">
                                    <img src="<?php echo $screenshotUrl ?>">
                                    <span class="icon"><i class="icon i-large magnify"></i></span>
                                </a>
                            </div>
                            <figcaption>
                                <p><?php echo $project["ScreenshotDescription"] ?></p>
                            </figcaption>
                        </figure>
                    </div>
                </section>
                <?php
                    
                }
                
                $viewDirectory = strlen($project["ViewDirectory"]);
                $downloadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/projects/assets/' . $project["ProjectID"] . '/download.zip';
                $sourceLocation = strlen($project["SourceCode"]);
                
                if ($viewDirectory > 0 || file_exists($downloadDirectory) || $sourceLocation > 0) {
                            
                ?>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-theme-d3 text-centered">
                        <div class="cell-row dynamic">
                            <?php

                            if ($viewDirectory > 0)
                            {
                                echo '<div class="cell s12 section">
                                        <h2>View</h2>
                                        <p><a href="/project/' . "{$project["Alias"]}/{$project["ViewDirectory"]}" . '" target="_blank"><button class="download circle"><i class="icon i-large magnify"></i></button></a></p>
                                    </div>';
                            }

                            if (file_exists($downloadDirectory))
                            {
                                echo '<div class="cell s12 section">
                                        <h2>Download</h2>
                                        <p><a href="/projects/assets/' . $project["ProjectID"] . '/download.zip" download="' . $project["Alias"] . '_download.zip"><button class="download circle"><i class="icon i-large download"></i></button></a></p>
                                    </div>';
                            }

                            if ($sourceLocation > 0)
                            {
                                echo '<div class="cell s12 section">
                                        <h2>Source Code</h2>
                                        <p><a href="' . $project["SourceCode"] . '" target="_blank"><button class="download circle"><i class="icon i-large page"></i></button></a></p>
                                    </div>';
                            }

                            ?>
                        </div>
                    </div>
                </section>
                <?php } ?>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Project Information</h2>
                        <p>Additional information about this project.</p>
                        <table class="wb-table info-table">
                            <thead><tr><th colspan="2">Project:</th></tr></thead>
                            <tbody>
                                <tr><td>Creation Date:</td><td><?php echo (new DateTime($project["CreationDate"]))->format("d/m/Y") ?></td></tr>
                                <tr><td>Completion Date:</td><td><?php echo (new DateTime($project["LatestDate"]))->format("d/m/Y") ?></td></tr>
                                <tr><td>Status:</td><td>Completed!</td></tr>
                                <?php
    
                                $downloadUrl = $_SERVER['DOCUMENT_ROOT'] . "/projects/assets/" . $project["ProjectID"] . "/download.zip";
                                    
                                if (file_exists($downloadUrl))
                                {
                                    function getFileSizeOutput($bytes)
                                    {
                                        $kilobytes = $bytes / 1024;
                                        $megabytes = $kilobytes / 1024;
                                        $gigabytes = $megabytes / 1024;

                                        if ($gigabytes > 1) return round($gigabytes, 2) . " GB";
                                        else if ($megabytes > 1) return round($megabytes, 2) . " MB";
                                        else if ($kilobytes > 1) return round($kilobytes, 2) . " kB";
                                        else return round($bytes, 2) . " Bytes";
                                    }
                                    
                                    $fileSize = getFileSizeOutput(filesize($downloadUrl));
                                    
                                    echo "<tr><td>Download File Size:</td><td>{$fileSize}</td></tr>";
                                }
    
                                ?>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>