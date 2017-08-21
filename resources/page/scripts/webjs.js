"use strict";

var wjbaker = (function()
{
    const displayInfoMessage = (selector, message) =>
    {
        const messageOutput = document.querySelector(selector);

        if (!messageOutput)
            return;

        messageOutput.innerHTML = message.message;

        clearMessageColour();
        
        switch (message.type)
        {
            case "ERROR":
                messageOutput.classList.add("text-error");
                break;
            case "WARNING":
                messageOutput.classList.add("text-warning");
                break;
            case "SUCCESS":
                messageOutput.classList.add("text-success");
                break;
            case "REGULAR":
            default:
                messageOutput.classList.add("");
                break;
        }
        
        function clearMessageColour()
        {
            messageOutput.classList.remove("text-error");
            messageOutput.classList.remove("text-warning");
            messageOutput.classList.remove("text-success");
        }
    };

    const createResponse = (code, message, type) =>
    {
        return {
            code: code,
            message: message,
            type: type
        }
    };

    const ajax = (success, failure, userOptions = {}) =>
    {
        let defaultOptions =
        {
            url: null,
            type: "GET",
            parameters: "",
            headers: [{ header: "Content-type", value: "application/x-www-form-urlencoded" }]
        };
        
        const options = Object.assign({}, defaultOptions, userOptions);
        
        if (options.url === null || options.url.length == 0)
            throw new Error("Request URL cannot be null or empty.");
        
        if (options.type !== "GET" && options.type !== "POST")
            throw new Error("Request type must be \"GET\" or \"POST\".");
        
        let xhttp = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

        xhttp.onreadystatechange = () =>
        {
            if (xhttp.readyState == XMLHttpRequest.DONE)
            {
                if (xhttp.status == 200)
                {
                    let response = JSON.parse(xhttp.responseText);

                    success(response);
                }
                else
                {
                    failure();
                }
            }
        };

        xhttp.open(options.type, options.url, true);
        
        Array.from(options.headers)
             .forEach(e => xhttp.setRequestHeader(e.header, e.value));
        
        xhttp.send(options.parameters);
    };

    return {
        ajax: ajax,
        displayInfoMessage: displayInfoMessage,
        createResponse: createResponse
    };
})();

(() =>
{
    window.addEventListener("load", () =>
    {
        const initScrollFadeObserver = () =>
        {
            const observe = (elements, observer) =>
            {
                elements.forEach((element) =>
                {
                    if (element.isIntersecting)
                    {
                        element.target.classList.add("show");
                        
                        observer.unobserve(element.target);
                    }
                });
            };

            let observer = new IntersectionObserver(observe, { threshold: 0 });

            Array.from(document.querySelectorAll(".scroll-fade-in")).forEach(e => observer.observe(e));
        }
        
        document.querySelector(".header-nav-button").addEventListener("click", function()
        {
            document.querySelector("header").classList.toggle("open");
        });
        
        initScrollFadeObserver();
    });
})();