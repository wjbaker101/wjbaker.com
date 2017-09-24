<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

if ($user === NULL)
{
    header ("Location: /users/login.php");
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>William Baker | User: <?php echo $user["Username"] ?></title>
        
        <?php printHead(); ?>
        
        <script>
            (() =>
            {
                "use strict"
                
                window.addEventListener("load", () =>
                {
                    const sendLogoutRequest = () =>
                    {
                        const button = document.querySelector(".logout-button");
                        
                        if (button.disabled) return;
                        
                        setButtonState(button, true);
                        
                        let xhttp = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

                        xhttp.onreadystatechange = () =>
                        {
                            if (xhttp.readyState == XMLHttpRequest.DONE)
                            {
                                setButtonState(button, false);

                                if (xhttp.status == 200)
                                {
                                    let response = JSON.parse(xhttp.responseText);

                                    wjbaker.displayInfoMessage(".message-output", response);
                                    
                                    if (response.code === "success")
                                    {
                                        button.disabled = true;

                                        window.location.href = "/users/login.php";
                                    }
                                }
                            }
                        };

                        xhttp.open("POST", "resources/log-out.php", true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        
                        xhttp.send();
                    };
                    
                    document.querySelector(".logout-button").addEventListener("click", sendLogoutRequest);

                    const setButtonState = (button, loading) =>
                    {
                        button.disabled = (loading == true);
                        button.classList.toggle("loading", (loading == true));
                    };
                });
            })();
        </script>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header"><?php echo $user["Username"] ?></h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Information</h2>
                        <p>User was created on <?php echo (new DateTime($user["CreationDate"]))->format("d/m/Y") ?> at <?php echo (new DateTime($user["CreationDate"]))->format("H:i:s") ?>.</p>
                        <?php if ($user["IsAdmin"] == 1) echo '<p>You are an admin!</p>' ?>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white text-centered">
                        <p><button class="logout-button">Log Out</button></p>
                        <p class="info-message">
                            <i class="icon info"></i>
                            <span class="message-output">Press button to log out.</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>