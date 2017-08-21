<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

if (!isset($_POST["blogid"]))
{
    $response = new Response("failed_blog_id", "Blog ID cannot be blank.", "ERROR");
}
else if (!isset($_POST["title"]))
{
    $response = new Response("failed_title", "Title cannot be blank.", "ERROR");
}
else if (!isset($_POST["blogcontent"]))
{
    $response = new Response("failed_blog_content", "Blog content cannot be blank.", "ERROR");
}
else
{
    $blogId = $_POST["blogid"];
    $title = $_POST["title"];
    $previewContent =  isset($_POST["previewcontent"]) ? $_POST["previewcontent"] : "";
    $blogContent = $_POST["blogcontent"];
    
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_BlogDatabase");
    
    if ($connection)
    {
        $sqlBlogId = getSecureText($blogId, $connection, TRUE);
        $sqlTitle = getSecureText($title, $connection, TRUE);
        $sqlHeaderTitle = getSecureText(dashify($title), $connection, TRUE);
        $sqlBlogContent = getSecureText($blogContent, $connection, FALSE);
        $sqlPreviewText = getSecureText($previewContent, $connection, FALSE);
        
        $sql = "UPDATE BlogPosts SET Title='{$sqlTitle}', HeaderTitle='{$sqlHeaderTitle}', PreviewText='{$sqlPreviewText}', Content='{$sqlBlogContent}' WHERE BlogID='{$sqlBlogId}'";

        $result = $connection->query($sql);

        if ($result)
        {
            $response = new Response("success", "Successfully updated blog post.", "SUCCESS");
            
            $blogInfo = (object)[ "blogID" => $sqlBlogId, "headerTitle" => $sqlHeaderTitle ];
            
            $response->contents["blogInfo"] = $blogInfo;
        }
        else
        {
            $response = new Response("failed_query", "An error occured when trying to update blog post.", "ERROR");
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