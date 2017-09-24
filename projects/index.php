<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>William Baker | My Projects</title>
        
        <?php printHead(); ?>
        
        <style>
            article.project
            {
                display: inline-block;
            }
            
            article.project .content
            {
                transition: background-color 0.2s;
            }
            
            .icon.hidden, .hidden
            {
                display: none;
            }
        </style>
        
        <script>
            (() =>
            {
                window.addEventListener("load", () =>
                {
                    const onSuccess = (response) =>
                    {
                        if (response.code === "success")
                        {
                            document.querySelector(".message-container").classList.add("hidden");

                            const projectsContainer = document.querySelector(".projects-container");

                            let projects = response.contents.projects;

                            projectsContainer.innerHTML = "";

                            projects.forEach(project =>
                            {
                                projectsContainer.innerHTML +=
                                    `<article class="project cell l4 m6 s12 hpadding-small vpadding-small cell-top scroll-fade-in">
                                        <a href="/projects/view/` + project.ProjectID + `/` + project.Alias + `/">
                                            <div class="content hpadding-regular vpadding-regular bg-white hover-bg-theme-l5 text-centered">
                                                <img data-src='` + project.Screenshot + `'>
                                                <h3>` + project.Title + `</h3>
                                            </div>
                                        </a>
                                    </article>`;
                            });
                            
                            Array.from(projectsContainer.querySelectorAll("img")).forEach(element =>
                            {
                                let img = new Image();
                                
                                img.addEventListener("load", () => element.src = img.src);
                                
                                img.src = element.getAttribute("data-src");
                            });
                        }
                        else
                        {
                            wjbaker.displayInfoMessage(".message-output", response);
                            document.querySelector(".message-output").classList.remove("hidden");
                            document.querySelector(".icon.loading").classList.add("hidden");
                        }
                    };
                    
                    const onFailure = () =>
                    {
                        wjbaker.displayInfoMessage(".message-output", wjbaker.createResponse("failed_error", "Unable to load projects.", "ERROR"));
                        document.querySelector(".message-output").classList.remove("hidden");
                        document.querySelector(".icon.loading").classList.add("hidden");
                    };
                    
                    const options =
                    {
                        url: "resources/get-projects.php",
                        type: "GET",
                    };
                    
                    wjbaker.ajax(onSuccess, onFailure, options);
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
                        <h1 class="fancy-header">Projects</h1>
                    </div>
                </section>
                <section class="cell-row section message-container">
                    <div class="cell l12 vpadding-regular hpadding-regular text-centered">
                        <div>
                            <p class="message-output hidden"></p>
                        </div>
                        <i class="icon i-large loading"></i>
                    </div>
                </section>
                <section class="cell-row section">
                    <div class="projects-container"></div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>