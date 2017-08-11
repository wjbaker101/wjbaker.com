<?php

date_default_timezone_set("Europe/London");

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

session_start();

$username = $_POST["username"];
$password1 = $_POST["password1"];
$password2 = $_POST["password2"];

if (!isset($username) || !isset($password1) || !isset($password2))
{
    $response = new Response("failed_headers", "Incomplete header was sent.", "ERROR");
}
else if ($username == "")
{
    $response = new Response("failed_username", "Username cannot be blank.", "ERROR");
}
else if ($password1 == "")
{
    $response = new Response("failed_password1", "Password cannot be blank.", "ERROR");
}
else if ($password2 == "")
{
    $response = new Response("failed_password2", "Confirmation password cannot be blank.", "ERROR");
}
else if ($password1 != $password2)
{
    $response = new Response("failed_passwords_differ", "Passwords cannot be different.", "ERROR");
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

        if ($result)
        {
            if ($result->num_rows > 0)
            {
                $response = new Response("failed_taken", "Username has already been taken.", "WARNING");
            }
            else
            {
                $sqlPassword = password_hash($password1, PASSWORD_BCRYPT);
                $sqlDate = (new DateTime())->format("Y-m-d H:i:s");
                
                $sql = "INSERT INTO Users(Username, Password, CreationDate) VALUES('{$sqlUsername}', '{$sqlPassword}', '{$sqlDate}')";
                
                if ($connection->query($sql))
                {
                    $response = new Response("success", "New user has successfully been created.", "SUCCESS");
                }
                else
                {
                    $response = new Response("failed_query", "An error occured when trying to create the user in the database.", "ERROR"); 
                }
            }
        }
        else
        {
            $response = new Response("failed_query", "An error occured when trying to create the user in the database.", "ERROR");
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