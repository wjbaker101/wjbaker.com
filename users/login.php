<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

if ($user !== NULL)
{
    header ("Location: /users/user.php");
    exit;
}

?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Login</title>
        
        <?php printHead(); ?>
        
        <style>
            .text-input-container i.icon
            {
                margin: 0 1em;
            }
        </style>
        
        <script>
            (() =>
            {
                "use strict"
                
                window.addEventListener("load", () =>
                {
                    const sendLoginRequest = () =>
                    {
                        const button = document.querySelector(".login-button");
                        
                        if (button.disabled) return;
                        
                        let username = document.querySelector(".username-input").value.trim();
                        let password = document.querySelector(".password-input").value.trim();
                        
                        if (username.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_username", "Username cannot be blank.", "ERROR"));
                        }
                        else if (password.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_password", "Password cannot be blank.", "ERROR"));
                        }
                        else
                        {
                            setButtonState(button, true);
                            
                            let parameters = "username=" + username + "&password=" + password;
                            
                            const onComplete = () =>
                            {
                                setButtonState(button, false);
                            };
                            
                            const onSuccess = response =>
                            {
                                onComplete();
                                
                                wjbaker.displayInfoMessage(".message-output", response);
                                
                                if (response.code === "success")
                                {
                                    button.disabled = true;

                                    window.location.href = "/users/user.php";
                                }
                            };
                            
                            const onFailure = () =>
                            {
                                onComplete();
                                
                                wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_error", "Unable to log in.", "ERROR"));
                            };
                            
                            let options =
                            {
                                url: "resources/log-in.php",
                                type: "POST",
                                parameters: parameters
                            };
                            
                            wjbaker.ajax(onSuccess, onFailure, options);
                        }
                    };
                    
                    const inputEnterPressed = e =>
                    {
                        if (e.keyCode == 13) sendLoginRequest();
                    };
                    
                    document.querySelector(".login-button").addEventListener("click", sendLoginRequest);
                    document.querySelector(".username-input").addEventListener("keypress", inputEnterPressed);
                    document.querySelector(".password-input").addEventListener("keypress", inputEnterPressed);

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
                        <h1 class="fancy-header">Login</h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l6 m12 vpadding-large hpadding-regular bg-white">
                        <h2>Login</h2>
                        <div class="text-input-container section">
                            <i class="icon username"></i><input class="username-input" type="text" placeholder="Username..." autofocus>
                        </div>
                        <div class="text-input-container section">
                            <i class="icon password"></i><input class="password-input" type="password" placeholder="Password...">
                        </div>
                        <p><button class="login-button">Login</button></p>
                        <p class="info-message">
                            <i class="icon info"></i>
                            <span class="message-output">Press button to log in.</span>
                        </p>
                    </div>
                    <div class="cell l6 m12 vpadding-large hpadding-regular bg-theme-l5">
                        <h2>Create a new User</h2>
                        <p>Make your own user on this website!</p>
                        <p><a href="new.php"><button>New User</button></a></p>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>