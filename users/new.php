<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | New User</title>
        
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
                "use strict";
                
                window.addEventListener("load", () =>
                {
                    const sendLoginRequest = () =>
                    {
                        const button = document.querySelector(".login-button");
                        
                        if (button.disabled) return;
                        
                        let username = document.querySelector(".username-input").value.trim();
                        let password1 = document.querySelector(".password1-input").value.trim();
                        let password2 = document.querySelector(".password2-input").value.trim();
                        
                        if (username.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_username", "Username cannot be blank.", "ERROR"));
                        }
                        else if (password1.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_password1", "Password cannot be blank.", "ERROR"));
                        }
                        else if (password2.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_password2", "Confirmation Password cannot be blank.", "ERROR"));
                        }
                        else if (password1 != password2)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_passwords_differ", "Passwords cannot be different.", "ERROR"));
                        }
                        else
                        {
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

                            xhttp.open("POST", "resources/create-user.php", true);
                            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                            let parameters = "username=" + username +
                                             "&password1=" + password1 +
                                             "&password2=" + password2;
                            
                            xhttp.send(parameters);
                        }
                    };
                    
                    const inputEnterPressed = e =>
                    {
                        if (e.keyCode == 13) sendLoginRequest();
                    };
                    
                    document.querySelector(".login-button").addEventListener("click", sendLoginRequest);
                    document.querySelector(".username-input").addEventListener("keypress", inputEnterPressed);
                    document.querySelector(".password1-input").addEventListener("keypress", inputEnterPressed);
                    document.querySelector(".password2-input").addEventListener("keypress", inputEnterPressed);

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
        <div class="main-page">
            <div class="content-width vpadding-regular">
                <section class="cell-row">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">New User</h1>
                    </div>
                </section>
                <section class="cell-row section">
                    <div class="cell l12 vpadding-small hpadding-small bg-theme-d4">
                        <p class="title-bar"><a class="return-link" href="login.php">To login page...</a></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Create</h2>
                        <p>Choose a Username and Password for your new user.</p>
                        <div class="text-input-container section">
                            <i class="icon username"></i><input class="username-input" type="text" placeholder="Username..." autofocus>
                        </div>
                        <div class="text-input-container section">
                            <i class="icon password"></i><input class="password1-input" type="password" placeholder="Password...">
                        </div>
                        <div class="text-input-container section">
                            <i class="icon password"></i><input class="password2-input" type="password" placeholder="Confirm Password...">
                        </div>
                        <p><button class="login-button">Login</button></p>
                        <p class="info-message">
                            <i class="icon info"></i>
                            <span class="message-output">Press button to submit.</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>