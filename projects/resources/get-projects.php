<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

$response = new Response("failed_error", "Unable to load projects.", "ERROR");

$connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_ProjectDatabase");

$sqlData = "ProjectID, Title, Alias";
$sql = "SELECT {$sqlData} FROM Projects ORDER BY ProjectID ASC";

$result = $connection->query($sql);

if ($result->num_rows > 0)
{
    $response = new Response("success", "Projects successfully loaded.", "SUCCESS");
    
    while ($project = $result->fetch_assoc())
    {
        $screenshotUrl = '/projects/assets/' . $project["ProjectID"] . '/screenshot.jpg';
        
        if (file_exists($_SERVER['DOCUMENT_ROOT'] . $screenshotUrl))
        {
            $project["Screenshot"] = $screenshotUrl;
        }
        else
        {
            $project["Screenshot"] = 'data:image/svg+xml;utf8,<svg width="120" height="120" version="1.1" viewBox="0 0 31.749999 31.750001" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -265.25)" stroke="#176bc0" stroke-width=".26458"><path d="m6.6146 269.22v23.812h18.521l1e-6-17.198-6.6146-6.6146z" fill="#fff"/><path d="m18.521 269.22v6.6146h6.6146" fill="none"/></g></svg>';
        }
        
        $response->contents["projects"][] = $project;
    }
}

echo json_encode($response);

?>