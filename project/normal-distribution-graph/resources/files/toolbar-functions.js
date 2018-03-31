    /*
    * Toggles the visibility of the toolbar
    */
    function toggleToolbarVisible()
    {
        var toolbar = document.getElementById("toolbar"); // Stores the toolbar element
        if (toolbarVisible) // Checks whether the toolbar is currently visible
        {
            toolbarVisible = false; // Sets toolBarVisible to false
            toolbar.style.height = "0px"; // Sets the height to 0
            toolbar.style.width = "0px"; // Sets the width to 0
            toolbar.style.minWidth = "0px"; // Sets minimum width to 0px

            // Sets the canvas top variable to 80px so it is closer to the top as there is no toolbar visible
            graphCanvas.style.top = "80px";
            linesCanvas.style.top = "80px";
        }
        else
        {
            toolbarVisible = true; // Sets toolBarVisible to false
            toolbar.style.height = "25px"; // Sets the height to 25
            toolbar.style.width = "100%"; // Sets the width to 100%
            toolbar.style.minWidth = "1280px"; // Sets minimum width to 1280px

            // Sets the canvas top variable to 105px so it is further to the top as there is a toolbar visible
            graphCanvas.style.top = "105px";
            linesCanvas.style.top = "105px";
        }
        resizeCanvas(); // Updates the size the canvas
    }

    /*
    * Function called when the save button on the toolbar is clicked
    */
    function toolbarSaveButton_Click()
    {
        var saveScreen = document.getElementById("saveScreen"); // Stores the save button element

        saveScreen.style.opacity = "0"; // Sets opacity to 0.0
        // Loops through the opacity 0.0-1.0, to produce a smooth fade transition
        var fade = 0;
        var fadeIn = setInterval(function()
        {
            fade += 0.1; // Increases the opacity by 0.1
            saveScreen.style.opacity = fade; // Sets the screen's opacity to the new opacity
            if (fade >= 1) // Checks whether the face is greater or equal to 1 (100% Opaque)
                clearInterval(fadeIn); // Stops the loop
        // Runs 60 times per second
        }, 1000/60);

        saveScreen.style.display = "initial"; // Sets the save screen to visible
        document.getElementById("loadScreen").style.display = "none"; // Sets the load screen to invisible
        document.getElementById("saveScreenMessage").innerHTML = ""; // Clears the save screen message inner html
        document.getElementById("saveScreenNameInput").value = ""; // Clears the name input
        document.getElementById("saveScreenNameInput").focus(); // Focuses the name input
    }

    /*
    * Function called when the load button on the toolbar is clicked
    */
    function toolbarLoadButton_Click()
    {
        var loadScreen = document.getElementById("loadScreen"); // Stores the load button element
        loadScreen.style.display = "initial"; // Sets the load screen to visible
        document.getElementById("saveScreen").style.display = "none"; // Sets the save screen to invisible

        loadScreen.style.opacity = "0"; // Sets opacity to 0.0
        // Loops through the opacity 0.0-1.0, to produce a smooth fade transition
        var fade = 0;
        var fadeIn = setInterval(function()
        {
            fade += 0.1; // Increases the opacity by 0.1
            loadScreen.style.opacity = fade; // Sets the screen's opacity to the new opacity
            if (fade >= 1) // Checks whether the face is greater or equal to 1 (100% Opaque)
                clearInterval(fadeIn); // Stops the loop
        // Runs 60 times per second
        }, 1000/60);

        document.getElementById("presets").innerHTML = '<div class="loadingIcon"></div>'; // Displays the loading icon

        // Initialises the http request
        var xhttp;
        if (window.XMLHttpRequest) // Checks whether the browser supports XMLHttpRequest
            xhttp = new XMLHttpRequest(); // Creates a new XMLHttpRequest object
        else
            xhttp = new ActiveXObject("Microsoft.XMLHTTP"); // Creates a new ActiveXObject object (Used in Internet Explorer)

        // Function called when the ready state is changed
        xhttp.onreadystatechange = function()
        {
            if (xhttp.readyState == 4 && xhttp.status == 200) // Checks whether the ready state is equal to 4 and status is 200
            {
                var response = xhttp.responseText; // Stores the response from the request
                if (response == "failed") // Checks whether the response is a fail
                {
                    document.getElementById("presets").innerHTML = "<span>Unable to load.</span>"; // Displays an error message
                }
                else
                {
                    document.getElementById("presets").innerHTML = response; // Displays the successful response
                }
            }
        };
        xhttp.open("GET", "resources/files/loadpresets.php", true); // Opens the http request with GET to the loadpresets.php file asynchronously
        xhttp.send(); // Sends the request
    }

    /*
    * Function called when the exit button on the save screen is clicked
    */
    function saveScreenExitButton_Click()
    {
        var saveScreen = document.getElementById("saveScreen"); // Stores the save screen element
        saveScreen.style.display = "none"; // Sets the save screen to hidden
        document.getElementById("blurBackground").style.display = "none"; // Sets the dark background to hidden
    }

    // Called when a key is lifted from the name input
    document.getElementById("saveScreenNameInput").onkeyup = function()
    {
        if (event.keyCode == 13) // Checks if the event keycode is 13 (Enter)
            saveScreenConfirmButton_Click(); // Calls the on click function
    }

    /*
    * Function called when the confirm button on the save screen is clicked
    */
    function saveScreenConfirmButton_Click()
    {
        var nameInput = document.getElementById("saveScreenNameInput"); // Stores the name input element
        var message = document.getElementById("saveScreenMessage"); // Stores the message display element
        message.innerHTML = '<div class="loadingIcon"></div>'; // Sets the message to the loading icon

        if (nameInput.value.length > 0) // Checks if the length of the input is not blank
        {
            var saveScreen = document.getElementById("saveScreen"); // Stores the save screen element

            // Initialises the http request
            var xhttp;
            if (window.XMLHttpRequest) // Checks whether the browser supports XMLHttpRequest
                xhttp = new XMLHttpRequest(); // Creates a new XMLHttpRequest object
            else
                xhttp = new ActiveXObject("Microsoft.XMLHTTP"); // Creates a new ActiveXObject object (Used in Internet Explorer)

            // Function called when the ready state is changed
            xhttp.onreadystatechange = function()
            {
                if (xhttp.readyState == 4 && xhttp.status == 200) // Checks whether the ready state is equal to 4 and status is 200
                {
                    var response = xhttp.responseText; // Stores the response from the request
                    if (response == "success") // Checks if the response is "success"
                    {
                        saveScreen.style.display = "none"; // Sets the display of the save screen to hidden
                        document.getElementById("blurBackground").style.display = "none"; // Sets the display of the dark background to hidden
                    }
                    else
                    {
                        message.innerHTML = 'Unable to save graph.'; // Displays and error message
                    }
                    console.log(response);
                }
            };
            xhttp.open("POST", "resources/files/savepreset.php", true); // Opens the http request with POST to the savepreset.php file asynchronously
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Sets the header of the POST request

            // Replaces apostophes with character code to prevent errors
            var newName = encodeURIComponent(nameInput.value);
            newName = newName.replace("'", "\\\'");
            
            // Defines the parameter for the request
            // Includes each attribute from the lines and graph in order to save
            var parameter = "name=" + newName + "&mean=" + Graph.mean + "&standardDeviation=" + Graph.standardDeviation + "&direction=" + (Graph.defaultDirection ? "1" : "0") + "&defLine_zValue=" + DefaultLine.nonStandardizedzValue + "&secLine_zValue=" + SecondaryLine.nonStandardizedzValue + "&secLine_displayed=" + (SecondaryLine.display ? "1" : "0");
            xhttp.send(parameter); // Sends the request with the parameter
            console.log(parameter);
        }
        else
        {
            message.innerHTML = "Name cannot be blank."; // Displays an error message
        }
    }

    /*
    * Updates the graph and input boxes on the webpage with the new graph
    *
    * ARGS:
    * preset - Preset currently selected
    */
    function loadGraphPreset(preset)
    {
        var presetMean = parseFloat(preset[2]); // Stores the mean from the preset
        var presetStandardDeviation = parseFloat(preset[3]); // Stores the standard deviation from the preset
        var presetDirection = preset[4] == 1 ? true : false; // Stores which direction the graph should be from the preset. converts to boolean form
        var presetDefaultLineValue = parseFloat(preset[5]); // Stores the z value of the Default line
        var presetSecondaryLineDisplay = preset[6] == 1 ? true : false; // Stores whether the Secondary line should be displayed, converts to boolean form
        var presetSecondaryLineValue = parseFloat(preset[7]); // Stores the z value of the Secondary line

        defaultLineInput.value = formatDecimalString(presetDefaultLineValue, 2); // Formats the z value of the Default line and sets it as the input box's value
        if (presetSecondaryLineDisplay) // Checks whether the Secondary line should be displayed
        {
            secondaryLineInput.value = formatDecimalString(presetSecondaryLineValue, 2); // Formats the z value of the Secondary line and sets it as the input box's value
            zValueUpdate(SecondaryLine, presetSecondaryLineValue); // Updates the position and z value of the Secondary line
        }
        else
            secondaryLineInput.value = "0.00"; // Sets the secondary line z value input box to 0

        graphMeanInput.value = formatDecimalString(presetMean, 1); // Sets the graph mean input box to the new mean
        graphStandardDeviationInput.value = formatDecimalString(presetStandardDeviation, 1); // Sets the graph standard deviation input box to the new standard deviation

        Graph.setMean(presetMean); // Sets the new mean for the graph
        Graph.setStandardDeviation(presetStandardDeviation); // Sets the new standard deviation of the graph
        Graph.defaultDirection = presetDirection; // Sets the new direction of the graph
        zValueUpdate(DefaultLine, presetDefaultLineValue); // Updates the z value and position of the Default line

        setSecondaryLineBoxVisible(presetSecondaryLineDisplay); // Sets the Secondary line control elements to visible occording to the new visibility
        drawCanvas(); // Updates the graphics on the canvas
    }

    /*
    * Sets the Secondary line control elements to the given boolean
    *
    * AGRS:
    * visible - The new visiblity for the Secondary controls element
    */
    function setSecondaryLineBoxVisible(visible)
    {
        if (visible) // Checks if the visibility should be true
        {
            SecondaryLine.displayed = true; // Sets the Secondary line visibility to true 

            // Checks whether the display of the controls is hidden or blank
            if (document.getElementById("secondaryLineControls").style.display == "none" || document.getElementById("secondaryLineControls").style.display == "")
            {
                if (typeof secondaryLineBox.onclick == "function") // Checks whether the type of the onclick attribute is a function
                {
                    secondaryLineBox.onclick.apply(secondaryLineBox); // Simulates a click on the Secondary line controls button
                }
            }
        }
        else
        {
            SecondaryLine.displayed = false; // Sets the Secondary line visibility to false

            // Checks whether the display of the controls is initial (Visible)
            if (document.getElementById("secondaryLineControls").style.display == "initial")
            {
                if (typeof secondaryLineBox.onclick == "function") // Checks whether the type of the onclick attribute is a function
                {
                    secondaryLineBox.onclick.apply(secondaryLineBox); // Simulates a click on the Secondary line controls button
                }
            }
        }
    }

    /*
    * Function called when the delete button on the load screen is pressed
    *
    * ARGS:
    * id - ID of the preset which corresponds to the primary key of the item which is being deleted from the database
    */
    function loadScreenDeleteButton_Click(id)
    {
        var saveScreen = document.getElementById("saveScreen"); // Stores the save screen element

        // Initialises the http request
        var xhttp;
        if (window.XMLHttpRequest) // Checks whether the browser supports XMLHttpRequest
            xhttp = new XMLHttpRequest(); // Creates a new XMLHttpRequest object
        else
            xhttp = new ActiveXObject("Microsoft.XMLHTTP"); // Creates a new ActiveXObject object (Used in Internet Explorer)

        // Function called when the ready state is changed
        xhttp.onreadystatechange = function()
        {
            if (xhttp.readyState == 4 && xhttp.status == 200) // Checks whether the ready state is equal to 4 and status is 200
            {
                var response = xhttp.responseText; // Stores the response from the request
                if (response == "success") // Checks whether the response is "success"
                {
                    var element = document.getElementById(id); // Gets the element on the webpage with equal id of the preset being deleted
                    element.parentNode.removeChild(element); // Removes the element from the webpage

                    // Sets the selected preset display text to blanks
                    document.getElementById("presetTitle").innerHTML = "Select a graph..."; // Sets the title to a message
                    document.getElementById("presetMean").innerHTML = "-"; // Clears the mean display
                    document.getElementById("presetStandardDeviation").innerHTML = "-"; // Clears the standard deviation display

                    document.getElementById("presetDirection").innerHTML = "-"; // Clears the direction of the graph display

                    document.getElementById("presetDefaultValue").innerHTML = "-"; // Clears the Default line z value display
                    document.getElementById("presetSecondaryVisible").innerHTML = "-"; // Clears the Secondary line visibility display
                    document.getElementById("presetSecondaryValue").innerHTML = "-"; // Clears the Default line z value display

                    document.getElementById("presetConfirm").onclick = function() { ; }; // Clears the preset confirm button of an onclick function
                    document.getElementById("presetDelete").onclick = function() { ; }; // Clears the preset delete button of an onclick function
                }
            }
        }
        xhttp.open("POST", "resources/files/deletepreset.php", true); // Opens the http request with POST to the deletepreset.php file asynchronously
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Sets the header of the POST request

        var parameter = "id=" + id; // Defines the parameter for the request
        xhttp.send(parameter); // Sends the request with the parameter
    }

    /*
    * Function called when the exit button on the load screen is clicked
    */
    function loadScreenExitButton_Click()
    {
        var loadScreen = document.getElementById("loadScreen"); // Sets the load screen to hidden
        loadScreen.style.display = "none"; // Sets the load screen display to hidden
        document.getElementById("blurBackground").style.display = "none"; // Sets the dark background display to hidden
    }

    /*
    * Displays the attributes of the preset on the load screen
    *
    * ARGS:
    * preset - Preset of the graph which has been selected
    */
    function showPresetDetails(preset)
    {
        document.getElementById("presetTitle").innerHTML = preset[1]; // Stores the title of the preset
        document.getElementById("presetMean").innerHTML = formatDecimalString(preset[2], 1); // Stores the mean of the preset
        document.getElementById("presetStandardDeviation").innerHTML = formatDecimalString(preset[3], 1); // Stores the standard deviation of the prset

        document.getElementById("presetDirection").innerHTML = preset[4] == 1 ? "Normal" : "Opposite"; // Stores the direction of the preset, as Normal or Opposite

        document.getElementById("presetDefaultValue").innerHTML = formatDecimalString(preset[5], 2); // Storse the Default line z value of the preset
        document.getElementById("presetSecondaryVisible").innerHTML = preset[6] == 1 ? "Yes" : "No"; // Stores whether the Secondary line is displayed as Yes or No
        document.getElementById("presetSecondaryValue").innerHTML = preset[6] == 1 ? formatDecimalString(preset[7], 2) : "-"; // Stores the Secondary line z value

        document.getElementById("presetConfirm").onclick = function() { loadGraphPreset(preset); }; // Sets the onlick function of the confirm button with the parameter of the preset
        document.getElementById("presetDelete").onclick = function() { loadScreenDeleteButton_Click(preset[0]); }; // Sets the onlick function of the delete button with the parameter of the preset
    }