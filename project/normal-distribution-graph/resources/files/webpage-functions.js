var defaultLineInput = document.getElementById("defaultLineInput"); // Creates the default line z value textbox object

with (defaultLineInput) // References the default line input
{
    onfocus = function() // When the textbox is being focused
    {
        zValuePrevValue_DefaultLine = defaultLineInput.value; // Sets the default line previous value to the currect value
    }
    
    onblur = function() // When the textbox has lost focus
    {
        if (isNaN(defaultLineInput.value)) // Checks whether the value is not a number
            defaultLineInput.value = zValuePrevValue_DefaultLine; // Sets the value to the previous value
    }
    
    onkeyup = function() // When the user unpresses a key
    {
        
        if (event.keyCode == 13) // Checks to see if the key has the code 13 (Enter)
        {
            var input = parseFloat(defaultLineInput.value); // Stores the value of the textbox
            
            if (input >= Graph.minValue && input <= Graph.maxValue) // Checks whether the value is between the minimum and maximum values of the graph
            {
                defaultLineInput.value = formatDecimalString(input, 2); // Formats the value in the textbox
                zValueUpdate(DefaultLine, defaultLineInput.value); // Calls the loop to change the line's z value
            }
            else
                defaultLineInput.value = zValuePrevValue_DefaultLine; // Sets the value to the previous value
        }
    }
}

var secondaryLineInput = document.getElementById("secondaryLineInput"); // Creates the secondary line z value textbox object

with (secondaryLineInput) // References the secondary line input
{
    onfocus = function() // When the textbox is being focused
    {
        zValuePrevValue_SecondaryLine = secondaryLineInput.value; // Sets the secondary line previous value to the currect value
    }
    
    onblur = function() // When the textbox has lost focus
    {
        if (isNaN(secondaryLineInput.value)) // Checks whether the value is not a number
            secondaryLineInput.value = zValuePrevValue_SecondaryLine; // Sets the value to the previous value
    }
    
    onkeyup = function() // When the user unpresses a key
    {
        if (event.keyCode == 13) // Checks to see if the key has the code 13 (Enter)
        {
            var input = parseFloat(secondaryLineInput.value); // Stores the value of the textbox
            
            if (input >= Graph.minValue && input <= Graph.maxValue) // Checks whether the value is between the minimum and maximum values of the graph
            {
                secondaryLineInput.value = formatDecimalString(input, 2); // Formats the value in the textbox
                zValueUpdate(SecondaryLine, secondaryLineInput.value); // Calls the loop to change the line's z value
            }
            else
                secondaryLineInput.value = zValuePrevValue_SecondaryLine; // Sets the value to the previous value
        }
    }
}

var secondaryLineBox = document.getElementById("secondaryLineBox"); // Creates the secondary line box object

with (secondaryLineBox) // References the secondary line controls box
{
    onclick = function() // When the element is clicked
    {
        var lineControls = document.getElementById("secondaryLineControls"); // Stores the element of the controls
        
        if (SecondaryLine.display) // Checks whether the secondary line is being displayed
        {
            secondaryLineBox.innerHTML = "+"; // Sets the text to '+'
            lineControls.style.display = "none"; // Sets the display of the element to none
        }
        else
        {
            secondaryLineBox.innerHTML = ""; // Removes the text
            lineControls.style.display = "initial"; // Sets the display to become visible
        }
        
        SecondaryLine.toggleDisplayed(); // Toggles whether the secondary line is being displayed
        drawLines(); // Updates the lines
    }
    
    onmouseover = function() // When the mouse enters the element
    {
        if (SecondaryLine.display) // Checks whether the secondary line is being displayed
            secondaryLineBox.innerHTML = "-"; // Sets the text to '-'
    }
    
    onmouseout = function() // When the mouse leaves the element
    {
        if (SecondaryLine.display) // Checks whether the secondary line is being displayed
            secondaryLineBox.innerHTML = ""; // Clears the text
    }
}

var graphSettings = document.getElementById("graphSettings"); // Creates the graph settings button object

with (graphSettings) // References the graph settings button
{
    onclick = function() // When the button is clicked
    {
        toggleToolbarVisible(); // Toggles the toolbar's visiblity
        drawCanvas(); // Redraws the canvas
    }
}

var graphDirection = document.getElementById("graphDirection"); // Creates the graph direction button object

with (graphDirection) // References the graph direction button
{
    onclick = function() // When the button is clicked
    {
        if (Graph.defaultDirection) // Checks whether the graph is default direction
            Graph.defaultDirection = false; // Sets the graph default direction to false
        else
            Graph.defaultDirection = true; // Sets the graph default direction to true
        
        drawLines(); // Redraws the line
    }
}

var graphReset = document.getElementById("graphReset"); // Create the graph reset button object

with (graphReset) // References the graph reset button
{
    onclick = function() // When the button is clicked
    {
        resetGraphDefault(); // Calls the function to reset the graph
    }
}
            
var toolbarSaveButton = document.getElementById("toolbarSaveButton"); // Creates the save button object on the toolbar

with (toolbarSaveButton) // References the save button
{
    onclick = function() // When the button is clicked
    {
        toolbarSaveButton_Click(); // Calls the on click function
        document.getElementById("blurBackground").style.display = "initial"; // Sets the display of the dark background to visible
    }
}

var toolbarLoadButton = document.getElementById("toolbarLoadButton"); // Creates the load button object on the toolbar

with (toolbarLoadButton) // References the load button
{
    onclick = function() // When the button is clicked
    {
        toolbarLoadButton_Click(); // Calls the on click function
        document.getElementById("blurBackground").style.display = "initial"; // Sets the display of the dark background to visible
    }
}

var toolbarProbabilityTableButton = document.getElementById("toolbarProbabilityTableButton"); // Creates the probability table button object on the toolbar

with (toolbarProbabilityTableButton) // References the probability table button
{
    onclick = function() // When the button is clicked
    {
        window.location = "probability-table.html"; // Directs the window the new webpage
    }
}
            
var graphMeanInput = document.getElementById("graphMeanInput"); // Creates the graph mean input box object on the toolbar

with (graphMeanInput) // References the mean input box
{
    onfocus = function() // When the input box is focused
    {
        meanPrevValue = graphMeanInput.value; // Sets the previous value to the current value
    }
    
    onblur = function() // When the input box loses focus
    {
        if (isNaN(graphMeanInput.value)) // Checks whether the input box value is not a number
            graphMeanInput.value = meanPrevValue; // Sets the current value to the previous value
    }
    
    onkeyup = function() // When the input box key is lifted
    {
        if (event.keyCode == 13) // Checks whether the event keycode is 13 (Enter)
        {
            var input = parseFloat(graphMeanInput.value); // Stores the input box value, converted to a float type
            if (input >= 0 && input <= 100) // Checks whether the value is between 0 and 100 inclusive
            {
                var newMean = formatDecimalString(input, 1); // Formats the value to 1 decimal place
                Graph.setMean(parseFloat(newMean)); // Sets the new mean
                graphMeanInput.value = newMean; // Sets the input box value to the new mean

                drawCanvas(); // Redraws the canvas
                document.getElementById("defaultLineInput").value = formatDecimalString(DefaultLine.nonStandardizedzValue, 2); // Updates the Default line input box
                document.getElementById("secondaryLineInput").value = formatDecimalString(SecondaryLine.nonStandardizedzValue, 2); // Updates the Secondary line input box
            }
        }
    }
}

var graphStandardDeviationInput = document.getElementById("graphStandardDeviationInput"); // Creates the graph standard deviation input box object

with (graphStandardDeviationInput) // References the input box
{
    onfocus = function() // When the input box is focused
    {
        standardDeviationPrevValue = graphStandardDeviationInput.value; // Sets the previous value to the current value
    }
    
    onblur = function() // When the input box loses focus
    {
        if (isNaN(graphStandardDeviationInput.value)) // Checks whether the input box value is not a number
            graphStandardDeviationInput.value = standardDeviationPrevValue; // Sets the current value to the previous value
    }
    
    onkeyup = function() // When the input box key is lifted
    {
        if (event.keyCode == 13) // Checks whether the event keycode is 13 (Enter)
        {
            var input = parseFloat(graphStandardDeviationInput.value); // Stores the input box value, converted to a float type
            if (input >= 0.1 && input <= 100) // Checks whether the value is between 0.1 and 100 inclusive
            {
                var newStandardDevation = formatDecimalString(input, 1); // Formats the value to 1 decimal place
                Graph.setStandardDeviation(parseFloat(newStandardDevation)); // Sets the new standard deviation
                graphStandardDeviationInput.value = newStandardDevation; // Sets the input box value to the new standard deviation
                drawCanvas(); // Redraws the canvas
                document.getElementById("defaultLineInput").value = formatDecimalString(DefaultLine.nonStandardizedzValue, 2); // Updates the Default line input box
                document.getElementById("secondaryLineInput").value = formatDecimalString(SecondaryLine.nonStandardizedzValue, 2); // Updates the Secondary line input box
            }
        }
    }
}
            
var linesCanvas = document.getElementById("linesCanvas"); // Creates the lines canvas object

with (linesCanvas) // References the lines canvas
{
    onmousedown = function() // When the mouse is down on the canvas
    {
        onMouseDown(); // Calls the mouse down function
    }
    
    onmouseup = function() // When the mouse is up on the canvas
    {
        onMouseUp(); // Calls the mouse up function
    }
    
    onmousemove = function() // When the mouse is moved on the canvas
    {
        onMouseMove(); // Calls the mouse move function
    }
}