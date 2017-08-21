<?php

date_default_timezone_set("Europe/London");

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

if (!isset($_POST["blogid"]))
{
    setResponse("failed_title", "Blog ID cannot be blank.", "ERROR");
}
else
{
    $blogId = $_POST["blogid"];
    
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_BlogDatabase");
    
    if ($connection)
    {
        $sqlBlogId = getSecureText($blogId, $connection, TRUE);
        
        $sql = "DELETE FROM BlogPosts WHERE BlogID='{$sqlBlogId}'";

        $result = $connection->query($sql);

        if ($result)
        {
            setResponse("success", "Successfully deleted blog post.", "SUCCESS");
        }
        else
        {
            setResponse("failed_query", "An error occured when trying to delete blog post.", "ERROR");
        }

        $connection->close();
    }
    else
    {
        setResponse("failed_database", "Server was unable to connect to the database.", "ERROR");
    }
}

echo json_encode($response);

?>