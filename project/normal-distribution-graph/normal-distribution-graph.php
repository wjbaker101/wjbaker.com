<!DOCTYPE html>
<head>
    <!-- Sets the title of the webpage -->
    <title>Normal Distribution Graph</title>
    
    <!-- References these files for more code -->
    <!-- CSS files -->
    <link rel="stylesheet" type="text/css" href="resources/files/style_header.css">
    <link rel="stylesheet" type="text/css" href="resources/files/style_tools.css">
    
    <!-- JavaScript files -->
    <script src="resources/files/graph.js"></script>
    <script src="resources/files/lines.js"></script>
    <script src="resources/files/probability-values.js"></script>
    <script src="resources/files/jquery-1.11.3.js"></script>
    
    <!-- Main javascript code for the webpage -->
    <script type="text/javascript">
        var graphCanvas; // The canvas element on the webpage
        var graphGraphics; // Graphics of the graph canvas
        var linesCanvas; // The canvas element on the webpage
        var linesGraphics; // Graphics of the graph canvas
        
        var isMouseDown; // Whether the mouse is down
        var Graph; // The graph of the webpage
        var DefaultLine; // Default Line, instance of the Line object
        var SecondaryLine; // Secondary Line, instance of the Line object
        var mouseX; // Stores the X position of the mouse
        var mouseY; // Stores the Y position of the mouse
        var mouseDownX; // Stores the mouse x position when the mouse was initially down
        var mouseDownY; // Stores the mouse y position when the mouse was initially down
        var toolbarVisible = false; // Boolean to store whether the toolbar is being displayed or not
        
        var zValuePrevValue_DefaultLine; // Previous z value of the Default Line when the textbox's value changes invalidly
        var zValuePrevValue_SecondaryLine; // Previous z value of the Secondary Line when the textbox's value changes invalidly
        var meanPrevValue; // Previous value of the graph mean when the textbox's value changes invalidly
        var standardDeviationPrevValue; // Previous value of the graph standard deviation when the textbox's value changes invalidly
        
        var defaultLineInput; // Textbox of the z value of the Default Line
        var secondaryLineInput; // Textbox of the z value of the Secondary Line
        var secondaryLineBox; // Box of the secondary line the user can click to show/hide the controls
        var graphSettings; // The graph settings button
        var graphDirection; // The graph direction button
        var graphReset; // The graph reset button
        var toolbarSaveButton; // The save button on the toolbar
        var toolbarLoadButton; // The load button on the toolbar
        var toolbarProbabilityTableButton; // The probability table on the toolbar
        var graphMeanInput; // Textbox of the mean of the graph
        var graphStandardDeviationInput; // Textbox of the standard deviation of the graph
        
        /*
        * Function called when the document loads
        */
        $(document).ready(function()
        {  
            setupCanvas(); // Calls the setup function
            graphCanvas.style.opacity = "1.0"; // Sets the Graph Canvas' opacity to 1.0 (100% Opaque)
            linesCanvas.style.opacity = "1.0"; // Sets the Lines Canvas' opacity to 1.0 (100% Opaque)
        });
        
        /*
        * Function called when the window is resized
        */
        $(window).resize(function()
        {
            resizeCanvas(); // Calls the resize function
        });
        
        /*
        * Calculates the new width and height the canvas should be and sets the new sizes
        */
        function resizeCanvas()
        {
            // Calculates the width and height from the window's width and height
            var newWidth = window.innerWidth - 40; // Reduces the width to fit into the window
            var newHeight = window.innerHeight - (toolbarVisible ? 125 : 100); // Reduces the height to fit into the window, accounting for whether the toolbar is currently visible
            
            // Checks whether the new width and height are below the minimum values and resizes if true
            if (newWidth < 1024) newWidth = 1024;
            if (newHeight < 576) newHeight = 576;
            
            // Sets the width and height for the Lines Canvas
            // Sets the width of the element as well as changing the style width, to keep the same resolution
            linesCanvas.style.width = newWidth.toString() + "px";
            linesCanvas.style.height = newHeight.toString() + "px";
            linesCanvas.width = newWidth;
            linesCanvas.height = newHeight;
            
            // Sets the width and height for the Graph Canvas
            // Sets the width of the element as well as changing the style width, to keep the same resolution
            graphCanvas.style.width = newWidth.toString() + "px";
            graphCanvas.style.height = newHeight.toString() + "px";
            graphCanvas.width = newWidth;
            graphCanvas.height = newHeight;
            
            drawCanvas(); // Redraws the graphics of the canvas'
        }
        
        /*
        * Sets up the initial values for variables
        */
        function setupCanvas()
        {
            // Stores the canvas' in a variable, as well as the graphics context of them
            graphCanvas = document.getElementById("graphCanvas");
            graphGraphics = graphCanvas.getContext("2d");
            linesCanvas = document.getElementById("linesCanvas");
            linesGraphics = linesCanvas.getContext("2d");
            
            // Initialises the graph and lines with there initial values
            Graph = new NormalDistributionGraph(graphCanvas);
            DefaultLine = new Line(Graph, "Default", "#0000FF", true);
            SecondaryLine = new Line(Graph, "Secondary", "#FF0000", false);
            
            resizeCanvas();
        }
        
        /*
        * Draws the components of the canvas, the graph and lines
        */
        function drawCanvas()
        {
            drawLines();
            drawGraph();
        }
        
        /*
        * Formats a given number with given decimal places
        *
        * ARGS:
        * decimal - Value to format
        * places - Number of decimal places to format to
        */
        function formatDecimal(decimal, places)
        {
            // Multiplies the value by 10 to the power of the number of places
            // Rounds the value
            // Divides by 10 to the power of the number of places
            return Math.round(decimal * (Math.pow(10, places))) / (Math.pow(10, places));
        }
        
        /*
        * Formats a string to include the given number of decimal places
        *
        * ARGS:
        * decimal - Value to format
        * places - Number of decimal places to format to
        */
        function formatDecimalString(decimal, places)
        {
            // Rounds the string to the given number of decimal places
            decimal = formatDecimal(decimal, places).toString();
            
            // Checks whether the value contains a "."
            if (decimal.indexOf(".") == -1)
            {
                decimal += "."; // Adds "." to the end of the decimal value
                for (var i = 0; i < places; i++) decimal += "0"; // For every missing leading 0 the temporary string will append "0" to the end
                return decimal; // Returns the formatted string, including leading zeros
            }
            else
            {
                var decimals = decimal.split(".")[1]; // Splits the value from the decimal point
                var maxLength = places - decimals.length; // Calculates the remaining length in order to complete the leading zeros
                for (var i = 0; i < maxLength; i++) decimal += "0"; // For every missing leading 0 the temporary string will append "0" to the end
                return decimal; // Returns the formatted string, including leading zeros
            }
        }
        
        function graphDrawLine(graphics, x1, y1, x2, y2, thickness, colour)
        {
            graphics.strokeStyle = colour;
            graphics.lineWidth = thickness;
            graphics.beginPath();
            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.stroke();
        }
        
        /*
        * Draws grid lines onto the graph canvas using the graph graphics
        */
        function drawGridLines()
        {
            var maximumX = (graphCanvas.width / 2) + Graph.maxPoint - 0.5; // Calculates the minimum X point of the graph
            var minimumX = (graphCanvas.width / 2) - Graph.maxPoint + 0.5; // Calculates the maximum X point of the graph
            var drawY = graphCanvas.height - Graph.yAxisOffset; // Calculates the Y position for drawing
            
            // Draws the minimum value line
            graphDrawLine(graphGraphics, minimumX, 0, minimumX, drawY - 4, 1, "#EFEFEF");
            
            // Draw the minimum value text
            graphGraphics.fillStyle = "#000000";
            graphGraphics.font = "18px Calibri";
            graphGraphics.fillText(formatDecimalString(Graph.minValue, 2), minimumX - (graphGraphics.measureText(formatDecimalString(Graph.minValue, 2)).width / 2), drawY + 18);
            
            // Draws the maximum value line
            graphDrawLine(graphGraphics, maximumX, 0, maximumX, drawY - 4, 1, "#EFEFEF");
            
            // Draw the maximum value text
            graphGraphics.fillStyle = "#000000";
            graphGraphics.font = "18px Calibri";
            graphGraphics.fillText(formatDecimalString(Graph.maxValue, 2), maximumX - (graphGraphics.measureText(formatDecimalString(Graph.maxValue, 2)).width / 2), drawY + 18);
        }
        
        /*
        * Draws all components of the graph onto the canvas
        */
        function drawGraph()
        {
            graphGraphics.clearRect(0, 0, graphCanvas.width, graphCanvas.height); // Clears the canvas of existing graphics
            
            drawGridLines(); // Draws the grid lines
            
            // Draws the normal distribution curve
            graphGraphics.strokeStyle = "#176BC0"; // Sets the colour to blue (#176BC0)
            graphGraphics.beginPath(); // Begins the drawing process
            graphGraphics.moveTo(0, Graph.yAxisOffset); // Sets the initial position
            for (var count = -100; count <= 100; count += 0.2) // Iterates through x values to produce the y position of the curve
            {
                var xpoint = (count * 15) + (graphCanvas.width / 2); // Translates the position suitable to draw onto the graph
                graphGraphics.lineTo(xpoint, Graph.getCurveY(count)); // Adds the point to the drawn curve
            }
            graphGraphics.stroke(); // Finally draws the curve
            
            // Draws the y-axis onto canvas
            graphDrawLine(graphGraphics, graphCanvas.width / 2, 0, graphCanvas.width / 2, graphCanvas.height - Graph.yAxisOffset, 2, "#176BC0");
            
            // Draws the x-axis onto canvas
            graphDrawLine(graphGraphics, 0, graphCanvas.height - Graph.yAxisOffset + 0.5, graphCanvas.width, graphCanvas.height - Graph.yAxisOffset + 0.5, 2, "#176BC0");
            
            // Draws the mean value text
            graphGraphics.fillStyle = "#000000";
            graphGraphics.font = "24px Calibri";
            graphGraphics.fillText(Graph.mean.toString(), (graphCanvas.width / 2) - (graphGraphics.measureText(Graph.mean.toString()).width / 2) + 0.5, graphCanvas.height - Graph.yAxisOffset + 25);
        }
        
        /*
        * Draws a shaded region between 2 points, with a y value of the graph curve
        *
        * ARGS:
        * startX - Start x position
        * endX - End x position
        */
        function drawShadedRegion(startX, endX)
        {
            var gradientFill = linesGraphics.createLinearGradient(startX, 0, endX, 0); // Stores the gradient for drawing the area graphics
            
            // Variables storing the light and dark shades of blue in the gradient
            var light = "rgba(100, 100, 255, 0.2)";
            var dark = "rgba(0, 0, 255, 0.2)";
            
            if (!SecondaryLine.display) // Checks whether the secondary line is being displayed
            {
                // Draws the gradient onto the canvas in the direction of graph direction
                gradientFill.addColorStop(Graph.defaultDirection ? 0 : 1, light);
                gradientFill.addColorStop(Graph.defaultDirection ? 1 : 0, dark);
            }
            else
            {
                // Draws the gradient onto the canvas between the 2 lines
                gradientFill.addColorStop(0, "rgba(0, 0, 255, 0.2)");
                gradientFill.addColorStop(0.5, "rgba(100, 100, 255, 0.2)");
                gradientFill.addColorStop(1, "rgba(0, 0, 255, 0.2)");
            }
            
            linesGraphics.beginPath(); // Starts drawing the curve
            linesGraphics.moveTo(startX, linesCanvas.height - Graph.yAxisOffset); // Sets initial position to the startX and the x-axis of the graph
            linesGraphics.fillStyle = gradientFill; // Sets the fill colour
            for (var x = startX; x < endX; x++) // Iterates through lowest coordinate to line position and adds draw point
            {
                linesGraphics.lineTo(x + 0.5, Graph.getCurveYTranslated(x) - 1); // Sets the next point to the new coordinates
            }
            linesGraphics.lineTo(endX - 1, linesCanvas.height - Graph.yAxisOffset); // Sets the end position of the curve
            linesGraphics.fill(); // Finally draws the shaded region
        }
        
        /*
        * Draws the shaded area onto the canvas, representing the area being calculated
        */
        function drawShadedArea()
        {
            if (SecondaryLine.display) // Checks whether the secondary line is being displayed
            {
                // Checks which of the 2 lines has a lower z value and stores the position in the lowerLine variable
                // The line's position with the greater z value is stored in the higherLine variable
                var lowerLine = (DefaultLine.position > SecondaryLine.position) ? SecondaryLine.position : DefaultLine.position;
                var higherLine = (DefaultLine.position > SecondaryLine.position) ? DefaultLine.position : SecondaryLine.position;
                
                // Checks whether the graph is being calculated in the default direction
                if (Graph.defaultDirection)
                    // Draws the shaded region between the lower line and the higher line
                    drawShadedRegion((linesCanvas.width / 2) + lowerLine, (linesCanvas.width / 2) + higherLine);
                else
                {
                    // Draws a shaded region between the minimum value of the graph to the lower line
                    // Draws a shaded region between the maximum value of the graph to the higher line
                    drawShadedRegion((linesCanvas.width / 2) - Graph.maxPoint, (linesCanvas.width / 2) + lowerLine);
                    drawShadedRegion((linesCanvas.width / 2) + higherLine, (linesCanvas.width / 2) + Graph.maxPoint);
                }
            }
            else
            {
                // Checks whether the graph is being calculated in the default direction
                if (Graph.defaultDirection)
                    // Draws the shaded region between the minimum value of the graph and the default line
                    drawShadedRegion((linesCanvas.width / 2) - Graph.maxPoint, (linesCanvas.width / 2) + DefaultLine.position, 1);
                else
                    // Draws the shaded region between the maximum value of the graph and the default line
                    drawShadedRegion((linesCanvas.width / 2) + DefaultLine.position, (linesCanvas.width / 2) + Graph.maxPoint, 1);
            }
        }
        
        /*
        * Draws a line onto the canvas
        *
        * ARGS:
        * line - Line object to be drawn
        */
        function drawLine(line)
        {
            line.setPosition(line.position); // Updates the position of the line
            // Draws the line onto the canvas
            graphDrawLine(linesGraphics, (linesCanvas.width / 2) + line.position, linesCanvas.height - Graph.yAxisOffset, (linesCanvas.width / 2) + line.position, line.height + 1, 2, line.colour);
            
            // Checks whether the non standardized z value of the given line is not equal to the mean of the graph
            if (line.nonStandardizedzValue != Graph.mean)
            {
                // Draws the z value above the line for user's reference
                linesGraphics.fillStyle = "#000000";
                linesGraphics.font = "18px Calibri";
                
                var zValueOutput = formatDecimalString(line.nonStandardizedzValue, 2); // Formats the z value for display
                var textOffset = (line.position > 420 || line.position < -420) ? -12 : 18; // Checks whether the line is above or below a certain value and changes the offset accordingly
                
                // Draws the z value display below the line
                linesGraphics.fillText(zValueOutput, (linesCanvas.width / 2) + line.position - (linesGraphics.measureText(zValueOutput).width / 2), linesCanvas.height - Graph.yAxisOffset + textOffset);
            }
        }
        
        /*
        * Calculates the probability and creates a formatted string to display
        */
        function probabilityOutputString()
        {
            var output = ""; // Initially sets the string to a blank string
            var probability = formatDecimalString(calculateProbability(), 4); // Calculates the probability and formats it to 4 decimal places
            var sign = Graph.defaultDirection ? "<" : ">"; // Checks the direction of the graph and sets the sign variable to the correct sign
            
            if (SecondaryLine.display) // Checks whether the second line is being displayed
            {
                // Checks which line has a lower value and formats it to 2 decimal places
                var lowerValue = formatDecimalString((DefaultLine.zValue > SecondaryLine.zValue) ? SecondaryLine.zValue : DefaultLine.zValue, 2);
                // Checks which line has a higher value and formats it to 2 decimal places
                var higherValue = formatDecimalString((DefaultLine.zValue > SecondaryLine.zValue) ? DefaultLine.zValue : SecondaryLine.zValue, 2);
                
                // Sets the output string in the format of P(a < X < b) = p
                // Where a is lower value, b is higher value and p is probability
                output = "P(" + lowerValue + " " + sign + " Z " + sign + " " + higherValue + ") = " + probability;
            }
            else
            {
                // Sets the output string in the format of P(X < a) = p
                // Where a is the Default line z value
                output = "P(Z " + sign + " " + formatDecimalString(DefaultLine.zValue, 2) + ") = " + probability;
            }
            return output; // Returns the output string
        }
        
        /*
        * Draws the lines onto the graph
        */
        function drawLines()
        {
            linesGraphics.clearRect(0, 0, linesCanvas.width, linesCanvas.height); // Clears the canvas before drawing graphics
            drawLine(DefaultLine); // Draws the default line
            
            if (SecondaryLine.display) // Checks whether the secondary line is being displayed and draws it
                drawLine(SecondaryLine);
            
            drawShadedArea(); // Draws the shaded area onto the canvas
            
            document.getElementById("probabilityValue").innerHTML = probabilityOutputString(); // Updates the probability display on the webpage
        }
        
        /*
        * Calculates the probability
        */
        function calculateProbability()
        {
            var defaultLineProb = getProbability(DefaultLine.zValue); // Gets the probability of the default line
            var secondaryLineProb = getProbability(SecondaryLine.zValue); // Gets the probability of the secondary line
            var probability; // Declares the variable to store the probability in
            
            if (SecondaryLine.display) // Checks whether the secondary line is being displayed
            {
                if (Graph.defaultDirection) // Checks if the graph is in the default direction
                    probability = Math.abs(defaultLineProb - secondaryLineProb); // Calculates the correct probability
                else
                    probability = 1- Math.abs(defaultLineProb - secondaryLineProb); // Calculates the correct probability
            }
            else
            {
                if (Graph.defaultDirection) // Checks whether the graph is in the default direction
                    probability = defaultLineProb; // Sets the probability to the default line's probability
                else
                    probability = 1 - defaultLineProb; // Calculates the probability
            }
            return probability; // Returns the calculated probability
        }
        
        /*
        * Updates the position of the line when it is being dragged
        *
        * ARGS:
        * line - Line being updated
        * posX - Updated position for the line
        */
        function updateLine(line, posX)
        {
            line.onLineDragged(posX - (linesCanvas.width / 2)); // Calls the onLineDragged function of the line at the position of the line relative to the centre of the graph
            
            // Sets the x value display to the updated value formatted to 2 decimal places
            document.getElementById(line.name == ("Default") ? "defaultLineInput" : "secondaryLineInput").value = formatDecimalString(formatDecimal(line.nonStandardizedzValue, 2).toString(), 2);
            drawLines(); // Draws the lines
        }
        
        /*
        * Function called when the mouse is down
        */
        function onMouseDown()
        {
            isMouseDown = true; // Sets isMouseDown to true
            
            var e = window.event; // Gets the window event
            var canvasRect = linesCanvas.getBoundingClientRect(); // Gets the position of the canvas relative to the window
            mouseDownX = e.clientX - canvasRect.left; // Calculates the mouse x position
            mouseDownY = e.clientY - canvasRect.top; // Calculates the mouse y position
        }
        
        /*
        * Function called when the mouse is up
        */
        function onMouseUp()
        {
            isMouseDown = false; // Sets isMouseDown to false
            
            // Sets both lines dragged variable to false
            DefaultLine.dragged = false;
            SecondaryLine.dragged = false;
        }
        
        /*
        * Function called when the mouse is moved
        */
        function onMouseMove()
        {
            // Gets the x and y coordinates of the mouse and calculates position relative to the Canvas
            // Sets CanvasRect to the bounds of the Canvas
            var windowEvent = window.event; // Gets the window event
            var canvasRect = linesCanvas.getBoundingClientRect(); // Gets the position of the canvas relative to the window
            mouseX = windowEvent.clientX - canvasRect.left; // Calculates the mouse x position
            mouseY = windowEvent.clientY - canvasRect.top; // Calculates the mouse y position
            var posX = mouseX; // Sets the initial value of posX to mouseX
            var posY = mouseY; // Sets the initial value of posY to mouseY
            
            var defaultLineDistance = Math.abs(posX - ((linesCanvas.width / 2) + DefaultLine.position)); // Calculates the distance between the mouse position and Default line
            var secondaryLineDistance = Math.abs(posX - ((linesCanvas.width / 2) + SecondaryLine.position)); // Calculates the distance between the mouse position and Secondary line
            
            if (defaultLineDistance < 6 || (secondaryLineDistance < 6 && SecondaryLine.display)) // Checks whether the mouse is 5 pixels away from a line
                linesCanvas.style.cursor = "ew-resize"; // Sets the mouse cursor to the horizontal double ended arrow
            else
                linesCanvas.style.cursor = "default"; // Sets the mouse cursor back to default
            
            // Checks whether the position is outside of the bounds
            if (posX - (linesCanvas.width / 2) > Graph.maxPoint) posX = (linesCanvas.width / 2) + Graph.maxPoint;
            if (posX - (linesCanvas.width / 2) < -Graph.maxPoint) posX = (linesCanvas.width / 2) - Graph.maxPoint;
            
            if (isMouseDown) // Checks if the mouse is down
            {
                var defaultDistance = Math.abs(mouseDownX - ((linesCanvas.width / 2) + DefaultLine.position)); // Calculates the distance between the mouse position and Default line
                var secondaryDistance = Math.abs(mouseDownX - ((linesCanvas.width / 2) + SecondaryLine.position)); // Calculates the distance between the mouse position and Secondary line
                
                // Whether the Default line can be moved by the mouse
                var isDefaultLineTrue = DefaultLine.display && (defaultDistance < 6 || DefaultLine.dragged) && !SecondaryLine.dragged;
                // Whether the Secondary line can be moved by the mouse
                var isSecondaryLineTrue = SecondaryLine.display && (secondaryDistance < 6 || SecondaryLine.dragged) && !DefaultLine.dragged;

                // Checks whether both lines could be moved at the same time by the mouse
                // This prevents the mouse being able to move both lines and sticking together
                if (isDefaultLineTrue && isSecondaryLineTrue)
                {
                    // Checks if the mouse is closer to the default line
                    // Prevents the Secondary line from being able to move if true
                    if (Math.abs(posX - ((linesCanvas.width / 2) + DefaultLine.position)) > Math.abs(posX - ((linesCanvas.width / 2) + SecondaryLine.position)))
                    {
                        isSecondaryLineTrue = true;
                        isDefaultLineTrue = false;
                    }
                    else // Defaults to only the Default line being able to move
                    {
                        isSecondaryLineTrue = false;
                        isDefaultLineTrue = true;
                    }
                }
                
                
                if (isDefaultLineTrue) // Checks whether the default line is able to move
                    updateLine(DefaultLine, posX); // Updates the line position
                else if (isSecondaryLineTrue)
                    updateLine(SecondaryLine, posX); // Updates the line position
            }
        }
        
        /*
        * Updates the z value of a line, looping every 10 milliseconds for a smooth transition
        *
        * ARGS:
        * line - Line being updated
        * zValueNew - New z value to assign to the line
        */
        function zValueUpdate(line, zValueNew)
        {
            var z = (zValueNew - Graph.mean) / Graph.standardDeviation; // Standardizes the user input to calculate the z value
            var zAbs = Math.abs(z); // Calculates the correct z values so that they can be read from the array containing z values
            
            if (zAbs > 2.00 && zAbs < 2.50) // Between 2.00 and 2.50 values increase by 0.02
                z = Math.round(z * 2) / 2;
            
            if (zAbs > 2.50 && zAbs < 3.40) // Between 2.50 and 3.40 values increase by 0.05
                z = Math.round(z * 5) / 5;
            
            if (zAbs > 3.40 && zAbs < 4.00) // Between 3.40 and 4.00 values increase by 0.10
                z = Math.round(z * 10) / 10;
            
            z = (z * Graph.standardDeviation) + Graph.mean; // Unstandardizes the z value to output with the correct mean and standard deviation
            
            var maxPos = zValueNew / (Graph.maxValue / Graph.maxPoint); // Calculates the final position line will move to
            var newPos = line.position; // Stores the current position of the line
            
            // Global loop with the function parameter and interval parameter
            var lineLoop = setInterval(function()
            {
                if (line.nonStandardizedzValue > z) // Moves the line up or down, whether the final position is lower or higher than the current position
                    newPos -= 1; // Moves the line down/to the left
                else
                    newPos += 1; // Moves the line up/to the right
                
                line.setPosition(newPos); // Sets the current position of the line
                line.height = Graph.getCurveYTranslated(newPos + (Graph.canvas.width / 2)); // Sets a new height for the line
                
                drawLines(); // Redraws the lines
                
                if (Math.abs(line.nonStandardizedzValue - z) < 0.001) // Checks whether the line is within 0.01 of the final value to see if the loop should stop
                {
                    line.setzValue(zValueNew); // Sets the new z value of the line to the exact z value
                    clearInterval(lineLoop); // Stops the loop
                }
            }, 1000/60);
        }

        /*
        * Resets the graph and lines to their default values
        */
        function resetGraphDefault()
        {
            Graph.defaultDirection = true; // Sets default direction to true
            Graph.setStandardDeviation(1); // Sets graph standard deviation to 1
            Graph.setMean(0); // Sets graph mean to 0
            DefaultLine.setPosition(0); // Sets Default Line position to 0
            SecondaryLine.setPosition(0); // Sets Secondary Line position to 0
            setSecondaryLineBoxVisible(false); // Hides the Secondary Line and the controls
            
            drawCanvas(); // Redraws the canvas
            
            // Sets the values of the textboxes to default values
            document.getElementById("defaultLineInput").value = "0.00";
            document.getElementById("secondaryLineInput").value = "0.00";
            document.getElementById("graphMeanInput").value = "0.0";
            document.getElementById("graphStandardDeviationInput").value = "1.0";
        }
    </script>
    
    <style>
        /* Styling of the main body of the webpage */
        body
        {
            margin: 0;
            padding: 0;
            font-family: "Corbel";
        }
        
        /* Styling of the canvas */
        .canvas
        {
            width: 1024px;
            height: 576px;
            min-width: 1024px;
            min-height: 576px;
            position: absolute;
            top: 80px;
            left: 20px;
            border: 1px solid black;
            box-shadow: 3px 3px 3px #888888;
            opacity: 0.0;
            cursor: pointer;
            transition: opacity 1s;
        }
    </style>
</head>

<html>
    <body>
        <div class="header">
            <!-- Default Line Controls -->
            <div class="lineValueContainer">
                <div class="lineValueBox" id="defaultLineBox"></div>
                <span class="lineValueText">x Value:</span>
                <input class="lineValueInput" id="defaultLineInput" type="text" value="0.00"></input>
            </div>
            
            <!-- Secondary Line Controls -->
            <div class="lineValueContainer">
                <div class="lineValueBox" id="secondaryLineBox">+</div>
                <div id="secondaryLineControls">
                    <span class="lineValueText">x Value:</span>
                    <input class="lineValueInput" id="secondaryLineInput" type="text" value="0.00"></input>
                </div>
            </div>

            <div class="graphValueContainer">
                <div class="graphControlButton" id="graphSettings"></div>
                <div class="graphControlButton" id="graphReset"></div>
                <div class="graphControlButton" id="graphDirection"></div>
            </div>
    
            <div class="graphValueContainer">
                <span class="graphValueText graphValueTextSmall">Standard Deviation:</span>
                <input class="graphValueInput" id="graphStandardDeviationInput" type="text" value="1.0"></input>
            </div>
    
            <div class="graphValueContainer">
                <span class="graphValueText">Mean:</span>
                <input class="graphValueInput" id="graphMeanInput" type="text" value="0.0"></input>
            </div>
            
            <div class="probabilityValueContainer" id="probabilityValue">P(Z < 0.00) = 0.5000</div>
        </div>

        <!-- Toolbar Controls -->
        <div class="toolbarContainer" id="toolbar">
            <div class="toolbarOptionButton" id="toolbarSaveButton">Save</div>
            <div class="toolbarOptionButton" id="toolbarLoadButton">Load Graph</div>
            <div class="toolbarOptionButton" id="toolbarProbabilityTableButton">Normal Distribution Table</div>
        </div>
        
        <!-- Graph and Lines Canvas -->
        <canvas id="graphCanvas"  class="canvas" width="1280" height="720">Browser does not support canvas.</canvas>
        <canvas id="linesCanvas" class="canvas" width="1280" height="720">Browser does not support canvas.</canvas>

        <div class="blurBackground" id="blurBackground"></div>

        <!-- Save Screen -->
        <div class="saveScreenContainer" id="saveScreen">
            <span class="screenTitle">Save Current Graph:</span><br/>
            <span class="screenHeading">Enter name:</span><br/>
            <input class="saveScreenInput" id="saveScreenNameInput" type="text"></input>
            
            <br/><br/>
            <div class="screenButton" onclick="saveScreenConfirmButton_Click();">Confirm</div>
            <div class="screenButton" onclick="saveScreenExitButton_Click();">Exit</div>
            <div id="saveScreenMessage"></div>
        </div>
        
        <!-- Load Screen -->
        <div class="loadScreenContainer" id="loadScreen">
            <div class="screenButton screenButtonRight" onclick="loadScreenExitButton_Click();">Exit</div>
            <span class="screenTitle">Load Graph:</span><br/>
            <span class="screenHeading">Click on a item to load the graph...</span><br/><br/>
            
            <div class="loadScreenPresetsContainer" id="presets">
            	<div class="loadingIcon"></div>
            </div>
            
            
            <div class="loadScreenPresetDetailsContainer">
                <span class="presetDetailsTitle" id="presetTitle">Select a graph...</span><br/>
                <span class="presetDetailsHeading">Mean:</span> <span class="presetDetailsValue" id="presetMean">-</span><br/>
                <span class="presetDetailsHeading">Standard Deviation:</span> <span class="presetDetailsValue" id="presetStandardDeviation">-</span><br/>
                <span class="presetDetailsHeading">Direction:</span> <span class="presetDetailsValue" id="presetDirection">-</span><br/><br/>
                
                <div class="presetDetailsLineBox defaultLineBox"></div><br/><br/>
                <span class="presetDetailsHeading">Visible:</span> <span class="presetDetailsValue" id="presetDefaultVisible">Yes</span><br/>
                <span class="presetDetailsHeading">z Value:</span> <span class="presetDetailsValue" id="presetDefaultValue">-</span><br/><br/>
                    
                <div class="presetDetailsLineBox secondaryLineBox"></div><br/><br/>
                <span class="presetDetailsHeading">Visible:</span> <span class="presetDetailsValue" id="presetSecondaryVisible">-</span><br/>
                <span class="presetDetailsHeading">z Value:</span> <span class="presetDetailsValue" id="presetSecondaryValue">-</span>
                
                <div class="screenButton presetConfirmButtonContainer" id="presetConfirm" onclick="">Update Line</div>
                <div class="screenButton presetConfirmButtonContainer" id="presetDelete" onclick="">Delete</div>
            </div>
        </div>
    </body>
</html>

<!-- Includes javascript files -->
<script src="resources/files/webpage-functions.js"></script>
<script src="resources/files/toolbar-functions.js"></script>