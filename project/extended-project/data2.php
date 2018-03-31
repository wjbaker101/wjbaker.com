<?php

class Process
{
    public $name;
    public $message;
    public $entryTime;
}

$processArray = array();
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
            
$serverName = "WILLIAM-PC";
$connectionInfo = array("Database"=>"ProcessDatabase", "UID"=>"WilliamSQL", "PWD"=>"WilliamSQL1");
$connect = sqlsrv_connect($serverName, $connectionInfo);

if ($connect === false)
    die(print_r( sqlsrv_errors(), true));

$query =
"SELECT process_name, message, entry_time
FROM process_log WHERE entry_time between '" . $inputDate . " 00:00:00:000' AND '" . $inputDate . " 23:59:59:999' AND log_type_id=1 AND message IN ('Start', 'Finish')
ORDER BY process_name, entry_time";

$executeQuery = sqlsrv_query($connect, $query);
            
if ($executeQuery === false)
    die(print_r( sqlsrv_errors(), true));

function createArray()
{
    global $executeQuery;
    global $processCount;

    $currentName = "";
    while($row = sqlsrv_fetch_array($executeQuery, SQLSRV_FETCH_ASSOC))
    {
        echo'{name: \'' . $row["process_name"] . '\', message: \'' . $row["message"] . '\', entryTime: \'' . $row["entry_time"]->format("Y-m-d H:m:i") . '\'},' . "\n";

        if ($row["process_name"] != $currentName)
            $processCount ++;
        $currentName = $row["process_name"];
    }
}

?>