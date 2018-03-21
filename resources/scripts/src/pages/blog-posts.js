class Blog
{
    /**
     * Creates the blog.
     * 
     * @param {String} postContainerSelector Selector for the element to display the posts inside.
     */
    constructor(postContainerSelector)
    {
        this.postContainer = document.querySelector(postContainerSelector);
        
        this.requestPosts();
    }
    
    /**
     * Sends an ajax request for the list of blog posts to display.
     */
    requestPosts()
    {
        const request = wjbaker.ajax({ url: '/resources/php/query/blog-posts.php' });
        
        request.then((response) =>
        {
            this.postContainer.innerHTML = '';
            
            this.displayPosts(response.contents);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }
    
    /**
     * Displays the posts onto the webpage.
     * 
     * @param {Array} posts Array of post objects to display.
     */
    displayPosts(posts)
    {
        const postsHTML = posts.map((post) => this.createPostHTML(post));
        
        const startHTML = '<div class="cell-row">';
        const endHTML = '</div>';
        
        let html = '';
        
        html += startHTML;
        
        postsHTML.forEach((post, index) =>
        {
            html += post;
            
            if ((index !== 0) && (index !== postsHTML.length - 1) && ((index - 1) % 2 === 0))
            {
                html += `${endHTML}${startHTML}`;
            }
        });
        
        // Checks whether there are an odd number of posts
        // Adds a dummy post
        // Prevents last post being 100% width
        if (postsHTML.length % 2 !== 0)
        {
            html += '<div class="cell l6 m12"></div>';
        }
        
        html += endHTML;
        
        this.postContainer.innerHTML = html;
    }
    
    /**
     * Creates the post HTML from the data in the given object.
     * 
     * @param   {Object} post Data containing information about the post.
     * @returns {String} HTML of the post.
     */
    createPostHTML(post)
    {
        const date = this.parseDate(post.EntryDate);
        
        const formattedDate = this.formatDate(date);
        
        const html = `
            <div class="cell l6 m12">
                <div class="card full-height padding-small">
                    <h3>${post.Title}</h3>
                    <p>${formattedDate}</p>
                    <p><a href="/blog/post/${post.BlogID}/${post.HeaderTitle}/"><button>Read</button></a></p>
                </div>
            </div>
        `;
        
        return html;
    }
    
    /**
     * Converts a string date into a Date object.
     * 
     * @param   {string} entryDate Date to convert.
     * @returns {Date} New Date.
     */
    parseDate(entryDate)
    {
        const [date, time] = entryDate.split(' ');
        
        const [year, month, day] = date.split('-');
        
        const [hour, minute, seconds] = time.split(':');
        
        return new Date(year, month, day, hour, minute, seconds);
    }
    
    /**
     * Formats the Date to display onto the page.
     * 
     * @param   {Date} entryDate The date to format.
     * @returns {String} Formatted date.
     */
    formatDate(entryDate)
    {
        const day = this.getPostfix(entryDate.getDate());
        const month = this.getMonth(entryDate.getMonth());
        const year = entryDate.getFullYear();
        
        const hour = entryDate.getHours();
        const minutes = entryDate.getMinutes();
        
        return `${day} ${month} ${year} ${hour}:${minutes}`;
    }
    
    /**
     * Formats a number to contain the postfix.
     * 
     * @param   {Number} entryDay Number to format.
     * @returns {String} Formatted number, containing the postfix.
     */
    getPostfix(entryDay)
    {
        const postfixes = ['th', 'st', 'nd', 'rd'];
        const v = entryDay % 100;
        
        const index = (v - 20) % 10;
        
        const postfix = postfixes[index] || postfixes[v] || postfixes[0];
        
        return `${entryDay}${postfix}`;
    }
    
    /**
     * Maps an index to the name of the month.
     * 
     * @param   {Number} entryMonth Index of the month.
     * @returns {String} Name of the month.
     */
    getMonth(entryMonth)
    {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        return months[entryMonth];
    }
}

// Initialises the code when the page has loaded
// Creates a new blog with the correct element
window.addEventListener('load', () =>
{
    new Blog('.post-container');
});