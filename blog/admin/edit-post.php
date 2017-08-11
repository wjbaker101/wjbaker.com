<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

function leave()
{
    if (isset($connection))
        $connection->close();
    
    header("Location: /blog/");
    exit;
}
if ($user == NULL || $user["IsAdmin"] == 0) leave();

if (isset($_GET["id"]))
{
    require_once ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/utils/text-utils.php");
    
    $connection = new mysqli($databaseOptions->serverName, $databaseOptions->username, $databaseOptions->password, "wjbajaju_BlogDatabase");
    
    if (!$connection) leave();
    
    $sql = 'SELECT * FROM BlogPosts WHERE BlogID=' . getSecureText($_GET["id"], $connection, TRUE);
    $result = $connection->query($sql);
    
    if ($result->num_rows == 1)
    {
        $post = $result->fetch_assoc();
        $connection->close();
    }
    else leave();
}
else leave();

?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Edit Blog Post</title>
        
        <?php printHead(); ?>
        
        <link type="text/css" rel="stylesheet" href="/resources/page/external/jodit.min.css">
        <script type="text/javascript" src="/resources/page/external/jodit.min.js"></script>
        
        <style>
            .title-input { width: 100%; }
        </style>
        
        <script>
            (() =>
            {
                "use strict";
                
                window.addEventListener("load", () =>
                {
                    const sendEditRequest = () =>
                    {
                        const button = document.querySelector(".submit-button");
                        
                        if (button.disabled) return;
                        
                        let title = document.querySelector(".title-input").value.trim();
                        let previewText = document.querySelector(".preview-text-editor").value.trim();
                        let blogContent = document.querySelector(".blog-text-editor").value.trim();
                        
                        if (title.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_title", "Title cannot be blank.", "ERROR"));
                        }
                        else if (blogContent.length == 0)
                        {
                            wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_blogcontent", "Blog content cannot be blank.", "ERROR"));
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
                                            
                                            window.location.href = "/blog/post/" + response.contents.blogInfo.blogID + "/" + response.contents.blogInfo.headerTitle;
                                        }
                                    }
                                }
                            };

                            xhttp.open("POST", "resources/update-post.php", true);
                            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                            var parameters = "blogid=<?php echo $post["BlogID"] ?>" +
                                             "&title=" + title +
                                             "&previewcontent=" + previewText +
                                             "&blogcontent=" + blogContent;

                            xhttp.send(parameters);
                        }
                    };
                    
                    document.querySelector(".submit-button").addEventListener("click", sendEditRequest);
                    
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
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary">
                        <h1 class="fancy-header">New Blog Post</h1>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Blog Title</h2>
                        <p><input class="title-input" type="text" placeholder="Title..." value="<?php echo $post["Title"] ?>"></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Preview Content</h2>
                        <p>Enter a small description of the blog post:</p>
                        <textarea class="preview-text-editor" name="preview-text-editor"><?php echo $post["PreviewText"] ?></textarea>
                        <script>var preview_editor = new Jodit(".preview-text-editor", { colorPickerDefaultTab: "color", removeButtons: [ "about", "font", "fullsize", "hr", "video", "fontsize", "ul", "ol", "paragraph", "table", "left", "right", "center", "justify" ] });</script>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Blog Content</h2>
                        <p>Enter your blog content here:</p>
                        <textarea class="blog-text-editor" name="blog-text-editor"><?php echo $post["Content"] ?></textarea>
                        <script>var blog_editor = new Jodit(".blog-text-editor", { colorPickerDefaultTab: "color", removeButtons: [ "about", "font", "fullsize", "hr" ] });</script>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Finish</h2>
                        <p>A few things to make sure are correct:</p>
                        <ol>
                            <li>Make sure title is not blank.</li>
                            <li>Make sure the blog content is not blank.</li>
                            <li>Title contains no HTML (<em>It will be removed on submission</em>).</li>
                        </ol>
                        <button class="submit-button">Submit Post</button>
                        <p class="info-message">
                            <i class="icon info"></i>
                            <span class="message-output">Press button to submit post.</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>