<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php Page::meta(); ?>
        
        <title>Will Baker - New User</title>
        
        <meta name="description" content="Create a new user.">
        
        <?php Page::style(); ?>
        
        <style></style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php Page::scripts(); ?>
        
        <script>
            window.addEventListener('load', () =>
            {
                const signupButton = document.querySelector('[name=create]');
                
                signupButton.addEventListener('click', () =>
                {
                    const parameters =
                    {
                        username: document.querySelector('[name=username]').value,
                        password1: document.querySelector('[name=password1]').value,
                        password2: document.querySelector('[name=password2]').value,
                    };
                    
                    const options =
                    {
                        url: '/resources/php/query/signup.php',
                        method: 'POST',
                        parameters: parameters,
                    };
                    
                    const requestSignup = wjbaker.ajax(options);
                    
                    requestSignup.then((response) =>
                    {
                        console.log(response);
                    })
                    .catch((error) =>
                    {
                        console.log(error);
                    });
                });
            });
        </script>
    </head>
    
    <body>
        <?php Page::nav(); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1>Signup</h1>
            </div>
        </header>
        <main>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="card content-width padding-small">
                    <h2>Create a New User</h2>
                    <p><label for="username"><strong>Username</strong></label></p>
                    <input type="text" name="username" placeholder="Enter username" size="30" autofocus>
                    <p><label for="password1"><strong>Password</strong></label></p>
                    <input type="password" name="password1" placeholder="Enter password" size="30">
                    <p><label for="password2"><strong>Confirm Password</strong></label></p>
                    <input type="password" name="password2" placeholder="Re-enter password" size="30">
                    <p><button name="create">Create</button></p>
                    <p class="output-message"></p>
                </div>
            </div>
        </main>
        <?php Page::footer(); ?>
    </body>
</html>