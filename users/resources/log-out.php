<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/response-object.php");

session_start();

$_SESSION = array();

if (ini_get("session.use_cookies"))
{
    $params = session_get_cookie_params();
    
    setcookie(session_name(), "", time() - 42000,
              $params["path"],
              $params["domain"],
              $params["secure"],
              $params["httponly"]);
}

session_destroy();

$isUserSet = isset($_SESSION["Username"]) && !empty($_SESSION["Username"]);
$isPasswordSet = isset($_SESSION["Password"]) && !empty($_SESSION["Password"]);

if (!$isUserSet && !$isPasswordSet)
{
    $response = new Response("success", "Successfully logged out.", "SUCCESS");
}
else
{
    $response = new Response("failed", "Logging out was unsuccessful.", "ERROR");
}

echo json_encode($response);

?>