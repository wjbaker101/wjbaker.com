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
                            
                            let parameters = "username=" + username + "&password1=" + password1 + "&password2=" + password2;
                            
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

                                    window.location.href = "/users/login.php";
                                }
                            };
                            
                            const onFailure = () =>
                            {
                                onComplete();
                                
                                wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_error", "Unable to log in.", "ERROR"));
                            };
                            
                            let options =
                            {
                                url: "resources/create-user.php",
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
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">New User</h1>
                    </div>
                </section>
                <section class="cell-row section title-bar">
                    <div class="cell l12 vpadding-small hpadding-small bg-theme-d4">
                        <p>
                            <a class="page-link" href="/users/login.php">
                                <svg width="17" height="17" class="back-arrow" version="1.1" viewBox="0 0 4.2333332 4.2333334" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(0 -292.77)" fill="none" stroke="#fff">
                                        <path d="m1.5875 294.09-.79375.79375.79375.79375" stroke-width=".52917"/>
                                        <path d="m.79375 294.88h2.9104" stroke-width=".50664"/>
                                    </g>
                                </svg>
                                To login page...
                            </a>
                        </p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Create</h2>
                        <p>Choose a <strong>username</strong> and <strong>password</strong> for your new user.</p>
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