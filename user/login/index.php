<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title>Will Baker - User Login</title>
        
        <meta name="description" content="Log into an existing user.">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style></style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
        <script>
            window.addEventListener('load', () =>
            {
                const loginButton = document.querySelector('[name=login]');
                
                loginButton.addEventListener('click', () =>
                {
                    const parameters =
                    {
                        username: document.querySelector('[name=username]').value,
                        password: document.querySelector('[name=password]').value,
                    };
                    
                    const options =
                    {
                        url: '/resources/php/query/login.php',
                        method: 'POST',
                        parameters: parameters,
                    };
                    
                    const requestLogin = wjbaker.ajax(options);
                    
                    requestLogin.then((response) =>
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
        <?php require_once(PAGE_NAV); ?>
        <header>
            <div class="content-width hpadding-small vpadding-mid">
                <h1>Login</h1>
            </div>
        </header>
        <main>
            <div class="content-width hpadding-small vpadding-mid">
                <div class="card padding-small">
                    <h2>Existing User</h2>
                    <p><label for="username"><strong>Username</strong></label></p>
                    <input type="text" name="username" placeholder="Username" size="30" autofocus>
                    <p><label for="password"><strong>Password</strong></label></p>
                    <input type="password" name="password" placeholder="Password" size="30">
                    <p><button name="login">Login</button></p>
                </div>
                <div class="card padding-small">
                    <h2>Signup</h2>
                    <p>To create a new user, click the button below:</p>
                    <p><a href="/user/new/"><button>Signup</button></a></p>
                </div>
            </div>
        </main>
        <?php require_once(PAGE_FOOTER); ?>
    </body>
</html>