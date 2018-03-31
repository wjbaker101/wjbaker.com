<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

session_start();

$username = $_POST["username"];
$password = $_POST["password"];

if (!isset($username) || !isset($password))
{
    $response = new Response("failed_headers", "Incomplete header was sent.", "ERROR");
}
else if ($username == "")
{
    $response = new Response("failed_username", "Username cannot be blank.", "ERROR");
}
else if ($password == "")
{
    $response = new Response("failed_password", "Password cannot be blank.", "ERROR");
}
else
{
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_UserAccounts");
    
    if ($connection)
    {
        $sqlUsername = getSecureText($username, $connection, FALSE);
        
        $sql = "SELECT * FROM Users WHERE Username='{$sqlUsername}'";

        $result = $connection->query($sql);

        if ($result && $result->num_rows == 1)
        {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user["Password"]))
            {
                $_SESSION['Username'] = $user["Username"];
                $_SESSION['Password'] = $user["Password"];
                
                $response = new Response("success", "Successfully logged in.", "SUCCESS");
            }
            else
            {
                $response = new Response("failed_incorrect", "Username or password is incorrect.", "ERROR");
            }
        }
        else
        {
            if ($result->num_rows == 0)
                $response = new Response("failed_incorrect", "Username or password is incorrect.", "ERROR");
            else
                $response = new Response("failed_query", "An error occured when trying to find the user in the database.", "ERROR");
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