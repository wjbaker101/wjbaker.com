<?php

require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php");

$editMode = isset($_GET["edit"]);

?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | <?php echo $editMode ? "Edit Project" : "New Project" ?></title>
        
        <?php printHead(); ?>
        
        <link type="text/css" rel="stylesheet" href="/resources/page/external/jodit.min.css">
        <script type="text/javascript" src="/resources/page/external/jodit.min.js"></script>
        
        <style>
            .title-input { width: 100%; }
            
            .image-placeholder
            {
                width: 100%;
                padding-top: 56.25%;
            }
        </style>
        
        <script></script>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1><?php echo $editMode ? "Edit Existing Project" : "Create New Project" ?></h1>
                    </div>
                </section>
                <section class="cell-row section title-bar">
                    <div class="cell l12 vpadding-small hpadding-regular bg-theme-d5">
                        <p><a class="return-link">To projects page...</a></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Project Title</h2>
                        <p><input class="title-input" type="text" placeholder="Title..."></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Description</h2>
                        <p>Enter your project description here:</p>
                        <textarea class="description-text-editor" name="blog-text-editor"></textarea>
                        <script>var description_editor = new Jodit(".description-text-editor", { colorPickerDefaultTab: "color", removeButtons: [ "about", "fontsize", "fullsize", "hr" ] });</script>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Screenshot</h2>
                        <p><input type="file" placeholder="Title..."></p>
                        <div class="image-placeholder border-theme-l4"></div>
                        <p class="note-theme"><input class="title-input" type="text" placeholder="Screenshot Description..."></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Project Information</h2>
                        <p>Additional information about the project.</p>
                        <p>This will be displayed in a table.</p>
                        <h3>Start Date:</h3>
                        <p><input type="date" value="<?php echo (new DateTime())->format("Y-m-d") ?>"></p>
                        <h3>Completion Date:</h3>
                        <p><input type="date" value="<?php echo (new DateTime())->format("Y-m-d") ?>"></p>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>