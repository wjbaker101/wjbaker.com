<?php

date_default_timezone_set("Europe/London");

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

if (!isset($_POST["title"]))
{
    $response = new Response("failed_title", "Title cannot be blank.", "ERROR");
}
else if (!isset($_POST["blogcontent"]))
{
    $response = new Response("failed_blog_content", "Blog content cannot be blank.", "ERROR");
}
else
{
    $title = $_POST["title"];
    $previewContent =  isset($_POST["previewcontent"]) ? $_POST["previewcontent"] : "";
    $blogContent = $_POST["blogcontent"];
    
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_BlogDatabase");
    
    if ($connection)
    {
        $sqlBlogId = (new DateTime())->format("dmyHi");
        $sqlHeaderTitle = getSecureText(dashify($title), $connection, TRUE);
        $sqlTitle = getSecureText($title, $connection, TRUE);
        $sqlBlogContent = getSecureText($blogContent, $connection, FALSE);
        $sqlPreviewText = getSecureText($previewContent, $connection, FALSE);
        $sqlEntryDate = (new DateTime())->format("Y-m-d H:i:s");
        
        $sql = "INSERT INTO BlogPosts (BlogID, HeaderTitle, Title, Content, PreviewText, EntryDate) VALUES ('{$sqlBlogId}', '{$sqlHeaderTitle}', '{$sqlTitle}', '{$sqlBlogContent}', '{$sqlPreviewText}', '{$sqlEntryDate}')";

        $result = $connection->query($sql);

        if ($result)
        {
            $response = new Response("success", "Successfully created new blog post.", "SUCCESS");
            
            $blogInfo = (object)[ "blogID" => $sqlBlogId, "headerTitle" => $sqlHeaderTitle ];
            
            $response->contents["blogInfo"] = $blogInfo;
        }
        else
        {
            $response = new Response("failed_query", "An error occured when trying to create the new blog post.", "ERROR");
        }

        $connection->close();
    }
    else
    {
        $response = new Response("failed_database", "Server was unable to connect to the database.", "ERROR");
    }
}

echo json_encode($response);

?>