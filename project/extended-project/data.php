<?php

date_default_timezone_set("Europe/London");

$processCount = 0;
$inputDate = "";

if (isset($_GET["date"]))
{
    $inputDate = $_GET["date"];
    
    if(strlen($inputDate) != 10)
    {
        $inputDate = substr($inputDate, 0, 4) . "-" . substr($inputDate, 4, 2) . "-" . substr($inputDate, 6, 2);
    }
}
if ($inputDate == "")
    $inputDate = Date("Y-m-d");

$servername = "localhost";
$dbUsername = "wjbajaju_William";
$dbPassword = "WilliamSQL1";
$dbname = "wjbajaju_ProcessDatabase";

$connect = new mysqli($servername, $dbUsername, $dbPassword, $dbname);
$sql = 
"SELECT process_name, message, entry_time
FROM process_log WHERE entry_time between '" . $inputDate . " 00:00:00:000' AND '" . $inputDate . " 23:59:59:999' AND log_type_id=1 AND message IN ('Start', 'Finish')
ORDER BY process_name, entry_time";

$result = $connect->query($sql);

function createArray()
{
    global $sql;
    global $processCount;
    global $result;

    $currentName = "";
    while($row = $result->fetch_assoc())
    {
    	$entryTime = new DateTime($row["entry_time"]);
        echo'{name: \'' . $row["process_name"] . '\', message: \'' . $row["message"] . '\', entryTime: \'' . $entryTime->format("Y-m-d H:i:s") . '\'},' . "\n";

        if ($row["process_name"] != $currentName)
            $processCount ++;
        $currentName = $row["process_name"];
    }
}

?>