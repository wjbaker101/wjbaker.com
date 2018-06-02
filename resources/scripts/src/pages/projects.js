class Projects
{
    constructor(containerSelector)
    {
        this.projectsContainer = document.querySelector(containerSelector);
        
        this.loadingIcon = document.querySelector('[data-loading-icon]');

        this.requestProjects();
    }

    /**
     * Sends an ajax request for the projects.
     */
    requestProjects()
    {
        const request = wjbaker.ajax({ url: '/resources/php/query/projects.php' });
        
        this.loadingIcon.classList.add('loading');
        
        request.then((response) =>
        {
            this.projectsContainer.innerHTML = '';

            this.displayProjects(response.contents);
            
            this.loadingIcon.classList.remove('loading');
        })
        .catch((error) =>
        {
            this.loadingIcon.classList.remove('loading');
        });
    }

    /**
     * Display the responded projects onto the page.
     * 
     * @param {Array} projects Array of projects from the request to display.
     */
    displayProjects(projects)
    {
        const projectsHTML = projects.map((project) => this.createPostHTML(project));
        
        this.projectsContainer.innerHTML = projectsHTML.join('');
    }

    /**
     * Creates the project HTML from the data in the given object.
     * 
     * @param   {Object} post Data containing information about the project.
     * @returns {String} HTML of the project.
     */
    createPostHTML(project)
    {
        const description = project.Description.substr(0, 200);
        
        const screenshot = project.Screenshot === null ? '/resources/images/icons/projects.svg' : project.Screenshot;
        
        const html = `
            <div class="project-container card cell-row section">
                <div class="v-content cell l4 m12 hpadding-small vpadding-mid cell-middle text-centered">
                    <img src="${screenshot}">
                </div>
                <div class="v-content cell l8 m12">
                    <div class="h-content hpadding-small vpadding-mid">
                        <h2>${project.Title}</h2>
                        ${description}
                    </div>
                    <div class="h-content hpadding-small">
                        <p><a href="/projects/view/${project.ProjectID}/${project.TitleURL}/"><button>View</button></a></p>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }
}

window.addEventListener('load', () =>
{
    new Projects('.projects-container');
});