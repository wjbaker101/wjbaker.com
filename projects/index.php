<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | My Projects</title>
        
        <?php printHead(); ?>
        
        <style>
            article.project
            {
                width: 33.33333%;
                display: inline-block;
            }
            
            @media (max-width: 720px)
            {
                article.project
                {
                    width: 50%;
                }
            }
            
            @media (max-width: 540px)
            {
                article.project
                {
                    width: 100%;
                }
            }
        </style>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">Projects</h1>
                    </div>
                </section>
                <section class="cell-row section clearfix">
                    <div class="projects-container">
                        <?php
                        $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_ProjectDatabase");
                        
                        $sql = 'SELECT * FROM Projects ORDER BY ProjectID ASC';
                        
                        $result = $connection->query($sql);
                        
                        if ($result->num_rows > 0)
                        {
                            while ($project = $result->fetch_assoc())
                            {
                                echo getProjectHTML($project);
                            }
                        }
                        
                        $connection->close();
                        
                        function getProjectHTML($project)
                        {
                            $screenshotUrl = '/projects/assets/' . $project["ProjectID"] . '/screenshot.jpg';
                            
                            $screenshot = "";
                            
                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . $screenshotUrl))
                            {
                                $screenshot = ' src="' . $screenshotUrl . '"';
                            }
                            else
                            {
                                $screenshot = ' src=\'data:image/svg+xml;utf8,<svg width="120" height="120" version="1.1" viewBox="0 0 31.749999 31.750001" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -265.25)" stroke="#176bc0" stroke-width=".26458"><path d="m6.6146 269.22v23.812h18.521l1e-6-17.198-6.6146-6.6146z" fill="#fff"/><path d="m18.521 269.22v6.6146h6.6146" fill="none"/></g></svg>\'';
                            }
                            
                            return '<article class="project hpadding-small vpadding-small cell-top">
                                        <a href="/projects/view/' . $project["ProjectID"] . '/' . $project["Alias"] . '/">
                                            <div class="content hpadding-regular vpadding-regular bg-white text-centered">
                                                <img' . $screenshot . '>
                                                <h3>' . $project["Title"] . '</h3>
                                            </div>
                                        </a>
                                    </article>';
                        }

                        ?>
                    </div>
                        <?php
                        /*$connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_ProjectDatabase");
                        
                        $sql = 'SELECT * FROM Projects ORDER BY ProjectID ASC';
                        
                        $result = $connection->query($sql);
                        
                        if ($result->num_rows > 0)
                        {
                            while ($project = $result->fetch_assoc())
                            {
                                echo getProjectHTML($project);
                            }
                        }
                        
                        $connection->close();
                        
                        function getProjectHTML($project)
                        {
                            $screenshotUrl = '/projects/assets/' . $project["ProjectID"] . '/screenshot.jpg';
                            
                            $screenshot = "";
                            
                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . $screenshotUrl))
                            {
                                $screenshot = ' src="' . $screenshotUrl . '"';
                            }
                            else
                            {
                                $screenshot = ' src=\'data:image/svg+xml;utf8,<svg width="120" height="120" version="1.1" viewBox="0 0 31.749999 31.750001" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -265.25)" stroke="#176bc0" stroke-width=".26458"><path d="m6.6146 269.22v23.812h18.521l1e-6-17.198-6.6146-6.6146z" fill="#fff"/><path d="m18.521 269.22v6.6146h6.6146" fill="none"/></g></svg>\'';
                            }
                            
                            return '<article class="project hpadding-small vpadding-small">
                                        <a href="/projects/view/' . $project["ProjectID"] . '/' . $project["Alias"] . '/">
                                            <div class="content hpadding-regular vpadding-regular bg-white text-centered">
                                                <img' . $screenshot . '>
                                                <h3>' . $project["Title"] . '</h3>
                                            </div>
                                        </a>
                                    </article>';
                        }*/

                        ?>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>