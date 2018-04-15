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
        
        const startHTML = '<div class="cell-row">';
        const endHTML = '</div>';
        
        let html = '';
        
        html += startHTML;
        
        projectsHTML.forEach((project, index) =>
        {
            html += project;
            
            if ((index !== 0) && (index !== projectsHTML.length - 1) && ((index - 1) % 2 === 0))
            {
                html += `${endHTML}${startHTML}`;
            }
        });
        
        // Checks whether there are an odd number of project
        // Adds a dummy project
        // Prevents last project being 100% width
        if (projectsHTML.length % 2 !== 0)
        {
            html += '<div class="cell l6 m12"></div>';
        }
        
        html += endHTML;
        
        this.projectsContainer.innerHTML = html;
    }

    /**
     * Creates the project HTML from the data in the given object.
     * 
     * @param   {Object} post Data containing information about the project.
     * @returns {String} HTML of the project.
     */
    createPostHTML(project)
    {
        const html = `
            <div class="card cell l6 m12 padding-small fade-in">
                <div class="text-centered">
                    <img src="/resources/images/projects/thumbnails/${project.ProjectID}.jpg">
                </div>
                <h3>${project.Title}</h3>
                <p><a href="/projects/view/${project.ProjectID}/${project.TitleURL}/"><button>View</button></a></p>
            </div>
        `;
        
        return html;
    }
}

window.addEventListener('load', () =>
{
    new Projects('.projects-container');
});