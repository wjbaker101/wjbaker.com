<?php

session_start();

date_default_timezone_set("Europe/London");

require $_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/database.php";

$user = getUser();

$webLinks = array
(
    (object)["name" => "Home",
             "url" => "/",
             "active" => FALSE],
    
    (object)["name" => "About",
             "url" => "/about/",
             "active" => FALSE],
    
    (object)["name" => "Projects",
             "url" => "/projects/",
             "active" => FALSE],
    
    (object)["name" => "Blog",
             "url" => "/blog/",
             "active" => FALSE],
    
    (object)["name" => "Login",
             "url" => "/users/login.php",
             "active" => FALSE],
);

if ($user !== NULL)
{
    $webLinks[4]->url = "User";
    $webLinks[4]->url = "/users/user.php";
}

switch (str_replace("index.php", "", $_SERVER['PHP_SELF']))
{
    case "/":
        $webLinks[0]->active = TRUE;
        break;
    case "/about/":
        $webLinks[1]->active = TRUE;
        break;
    case "/projects/":
        $webLinks[2]->active = TRUE;
        break;
    case "/blog/":
        $webLinks[3]->active = TRUE;
        break;
    case "/users/login.php":
        $webLinks[4]->active = TRUE;
        break;
}

$socialLinks = array
(
    (object)["name" => "GitHub", "url" => "https://github.com/wjbaker101"]
);

function printHead()
{
    echo '<meta charset="utf-8">';
    echo '<meta name=viewport content="width=device-width, initial-scale=1.0">';
    
    echo '<link rel="stylesheet" type="text/css" href="/resources/page/style/webstyle.css">';
    //echo '<link href="https://fonts.googleapis.com/css?family=Heebo" rel="stylesheet">';
    //echo '<link href="https://fonts.googleapis.com/css?family=Athiti" rel="stylesheet">';
    
    echo '<script src="/resources/page/scripts/webjs.js"></script>';
}

function printHeader()
{
    global $webLinks;
    
    $urls = "";
    
    for ($i = 0; $i < count($webLinks); ++$i)
    {
        $activeLink = "";
        
        if ($webLinks[$i]->active)
            $activeLink = " active";
        
        $urls .= "<a class=\"vpadding-regular hpadding-regular{$activeLink}\" href=\"{$webLinks[$i]->url}\">{$webLinks[$i]->name}</a>";
    }
    
    echo '<header class="bg-theme-d1 hpadding-small">
            <div class="content-width clearfix">
                <h1 class="float-l clearfix">
                    <a class="vpadding-regular float-l" href="/">wjbaker.com</a>
                    <button class="header-nav-button vmargin-regular float-r">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                        <div class="bar-3"></div>
                    </button>
                </h1>
                <nav class="float-r">
                    ' . $urls . '
                </nav>
            </div>
        </header>';
}

function printFooter()
{
    global $webLinks;
    
    $urls = "";
    
    for ($i = 0; $i < count($webLinks); ++$i)
    {
        $urls .= "<a class=\"site-nav\" href=\"{$webLinks[$i]->url}\">{$webLinks[$i]->name}</a>";
    }
    
    echo '<footer class="vpadding-mid bg-theme text-centered">
            <section class="navigation section">
                <h2>Navigation</h2>
                <p>' . $urls . '</p>
            </section>
            <section class="copyright section">
                <p>Copyright &copy; William Baker.<br>All rights reserved.</p>
            </section>
        </footer>';
}

function getUser()
{
    if (isset($_SESSION["Username"]) && isset($_SESSION["Password"]))
    {
        $userUsername = $_SESSION["Username"];
        $userPassword = $_SESSION["Password"];
        
        require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
        
        $connection = new mysqli($GLOBALS["databaseOptions"]->serverName, $GLOBALS["databaseOptions"]->username, $GLOBALS["databaseOptions"]->password, "wjbajaju_UserAccounts");
        
        $sqlUsername = getSecureText($userUsername, $connection, FALSE);
        $sqlPassword = getSecureText($userPassword, $connection, FALSE);
        
        $sql = "SELECT * FROM Users WHERE Username='{$sqlUsername}' AND Password='{$sqlPassword}'";
        
        $result = $connection->query($sql);
        
        $connection->close();
        
        if ($result && $result->num_rows == 1)
            return $result->fetch_assoc();
        
        return NULL;
    }   
}

?>