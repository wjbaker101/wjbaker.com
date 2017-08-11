"use strict";

var wjbaker = (function()
{
    let displayInfoMessage = (selector, message) =>
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

    let createResponse = (code, message, type) =>
    {
        return {
            code: code,
            message: message,
            type: type
        }
    };

    let httpRequest = (success, failure, options) =>
    {
        let ajaxOptions =
        {
            url: options.url || null,
            type: options.type || "GET",
            parameters: options.parameters || "",
            headers: options.headers || [{ header: "Content-type", value: "application/x-www-form-urlencoded" }]
        };
        
        if (!options.url) return;
        
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
        
        if (options.headers)
        {
            Array.prototype.forEach.call(options.headers, (e) =>
            {
                xhttp.setRequestHeader(e);
            });
        }

        if (options.type === "POST" && options.parameters.length > 0)
            xhttp.send(parameters);
        else
            xhttp.send();
    };

    return {
        httpRequest: httpRequest,
        displayInfoMessage: displayInfoMessage,
        createResponse: createResponse
    }
})();

(() =>
{
    window.addEventListener("load", () =>
    {
        initScrollFadeObserver();
        
        function initScrollFadeObserver()
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

            Array.prototype.forEach.call(document.querySelectorAll(".scroll-fade-in"), e => observer.observe(e));
        }
        
        document.querySelector(".header-nav-button").addEventListener("click", function()
        {
            document.querySelector("header").classList.toggle("open");
        });
    });
})();