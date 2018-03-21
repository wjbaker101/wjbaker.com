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
        <main>
            <header>
                <div class="content-width">
                    <h1>Login</h1>
                </div>
            </header>
            <article>
                <div class="content-width">
                    <p><strong>Username</strong></p>
                    <input type="text" name="username" autofocus>
                    <p><strong>Password</strong></p>
                    <input type="password" name="password">
                    <p><button name="login">Login</button></p>
                </div>
            </article>
            <?php require_once(PAGE_FOOTER); ?>
        </main>
    </body>
</html>