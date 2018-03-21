<?php require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/main/start.php'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <?php require_once(PAGE_META); ?>
        
        <title>Will Baker - New User</title>
        
        <meta name="description" content="Create a new user.">
        
        <?php require_once(PAGE_STYLE); ?>
        
        <style></style>
        
        <link rel="stylesheet" href="/resources/style/css/webstyle.css">
        
        <?php require_once(PAGE_SCRIPTS); ?>
        
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
        <?php require_once(PAGE_NAV); ?>
        <main>
            <header>
                <div class="content-width">
                    <h1>New User</h1>
                </div>
            </header>
            <article>
                <div class="content-width">
                    <p><label for="username"><strong>Username</strong></label></p>
                    <input type="text" name="username" autofocus>
                    <p><label for="password1"><strong>Password</strong></label></p>
                    <input type="password" name="password1">
                    <p><label for="password2"><strong>Confirm Password</strong></label></p>
                    <input type="password" name="password2">
                    <p><button name="create">Create</button></p>
                </div>
            </article>
            <?php require_once(PAGE_FOOTER); ?>
        </main>
    </body>
</html>