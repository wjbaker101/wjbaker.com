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
    $projects = $result->fetch_all(MYSQLI_ASSOC);
    
    $response = new Response("success", "Projects successfully loaded.", "SUCCESS");
    $response->contents["projects"] = $projects;
}

echo json_encode($response);

?>