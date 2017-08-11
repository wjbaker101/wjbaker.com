<!DOCTYPE html>
<html>

<title>EPQ Process Chart</title>

<head>
    <script src="jquery-1.11.3.js"></script>
    <?php require 'data.php'; ?>
    
    <style>
        body
        {
            margin: 0;
            padding: 0;
            font-family: "Calibri";
        }
        
        #chartCanvas
        {
            position: absolute;
            border: 1px solid;
            margin-bottom: 20px;
            margin-left: 30px;
            min-width: 1024px;
            box-shadow: 3px 3px 3px #888888;
            opacity: 0.0;
            transition: opacity 1s;
        }
        
        .header
        {
            width: 100%;
            min-width: 1084px;
            height: 75px;
            position: relative;
            background-color: #176bc0;
            margin-bottom: 20px;
            box-shadow: 0px 0px 8px 2px #888888;
        }
        
        .headerTitle
        {
            font-size: 28px;
            font-weight: bold;
            color: white;
            position: absolute;
            margin: 10px;
        }
        
        .headerCurrentDate
        {
            font-size: 18px;
            font-weight: bold;
            color: white;
            position: absolute;
            margin: 10px;
            margin-top: 40px;
        }
        
        .navBar
        {
            margin-top: 0;
            height: 100%;
            line-height: 75px;
            float: right;
        }
        
        .navBar li
        {
            width: 80px;
            height: 100%;
            float: right;
            list-style: none;
            text-align: center;
            border-left: 1px solid #FFFFFF;
            cursor: pointer;
            transition: background-color 0.1s;
            font-size: 18px;
            font-weight: bold;
            color: #FFFFFF;
        }
        
        .navBar li:hover
        {
            background-color: #FFB400;
        }
        
        .arrow_left
        {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIYEyI12pwCGAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA+0lEQVRYw+2Vu0pDQRRF10luREiphUGs9Rss/IKAjyqVnen9BD/BgIiFraW/Y5cmIBb2FirLZkAINzcxNyZRZsFU8zh79mH2QCaTyfwCalPdWVXxnjpUn9XTZRXdUvvqk9+8qQO1qNpb1Cy8C/SBC6AzNr0JtIBYuAB1H7gEjoGqXptGfQHJyg5wDZT19jPdtjEmgFoC1A3gCOgB58nWMpoTHJhfgLoNPACHQHuebk1b0Fh1ZlQKiIhXoAucAPfA+w/Pj0W+9ULdUx+dnZtpOTBzCyLiIyJGEXEGHAB3wMvSHJgUROpVit0ybtXWWkfx//iM1uo7zmQyf44v+YjguaDl9rYAAAAASUVORK5CYII=);
            background-position: center;
            background-repeat: no-repeat;
        }
        
        .arrow_right
        {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIYEyIouZpuwQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA8UlEQVRYw+2VMUpDQRRFz9NE7LUQgrUbcQPpXIGta3AFAcUkaGdlE0PalNmEWmhnvo2doGjkpAkIkoRvzP9KmFMOzNzLvW94kEgkEjlQd9T1vxKvq0P1QT0oW7yinqivfnGjHqpbZRioqi2nM1SP1VrRCTSdT6a21b2iDJx9E/xURzPMXKu7aiWvxloeH1PuzPoRdeAeaKv76sYyEjh1MV7Uvrr92wQKJU9X8cM3P4BL4AoYRMR7mQa6wBGQRcSorASegB7QiIi7ZVcQcwxkwAVwHhGPRc2Ak07fgM3J2S3QADoR8bzay+hfrONEIrHyjAHR9zFKuW5laAAAAABJRU5ErkJggg==);
            background-position: center;
            background-repeat: no-repeat;
        }
        
        #loadingIcon
        {
            width: 100px;
            height: 100px;
            margin: auto;
            background-image: url(resources/images/loading.gif);
            background-position: center;
            background-repeat: no-repeat;
        }
        
        #errorMessage
        {
            width: 1000px;
            height: 100px;
            margin: auto;
            margin-top: 70px;
            font-weight: bold;
            font-size: 16px;
            color: #FF0000;
            text-align: center;
            display: none;
        }
        
        #dateInputContainer
        {
            width: 600px;
            height: 250px;
            border: 1px solid;
            border-radius: 5px;
            margin: auto;
            text-align: center;
            opacity: 0.0;
            background: linear-gradient(#F0F0FF, #F8F8FF);
            transition: opacity 0.5s;
        }
        
        .dateInput
        {
            width: 200px;
            height: 35px;
            outline: none;
            border: 1px solid #176BC0;
        }
        
        .dateInput:focus
        {
            border: 1px solid #176BFF;
            box-shadow: 1px 1px 1px #888888;
        }
        
        .dateConfirmButton
        {
            width: 150px;
            height: 35px;
            line-height: 35px;
            border: 1px solid #FFFFFF;
            background: #176BC0;
            background: linear-gradient(#176BC0, #2B7FD4);
            box-shadow: 0px 0px 1px #222222;
            cursor: pointer;
            text-align: center;
            color: #FFFFFF;
            font-family: "Corbel";
            font-size: 15px;
            font-weight: bold;
            outline: none;
        }
        
        .dateConfirmButton:hover
        {
            background: linear-gradient(10deg, rgba(255, 255, 255, 0.2), transparent), linear-gradient(#176BC0, #2B7FD4);
        }
        
        .dateTitle
        {
            font-size: 24px;
            font-weight: bold;
        }
    </style>
    
    <script>
        var chartCanvas;
        var graphics;
        
        var processArray = [<?php createArray(); ?>];
        
        $(document).ready(function()
        {  
            chartCanvas = document.getElementById("chartCanvas");
            graphics = chartCanvas.getContext("2d");
            
            resizeChartCanvas();
            chartCanvas.style.opacity = "1.0";
            document.getElementById("loadingIcon").style.display = "none";
            
            if (processArray.length == 0)
                document.getElementById("errorMessage").style.display = "inherit";
        });
        
        $(window).resize(function()
        {
            resizeChartCanvas();
        });
        
        function resizeChartCanvas()
        {
            var offsetX = 60;
            chartCanvas.width = document.body.clientWidth - offsetX;
            
            redrawChart();
        }
        
        function redrawChart()
        {
            graphics.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

            var nameWidth = 250;
            var hourWidth = (chartCanvas.width - nameWidth) / 24;
            var minuteWidth = parseInt(hourWidth / 60);
            var yOffset = 30.5;
            var processSpacing = 20;
            
            // 2015-05-23 07:30:12
            var drawY = 30.5;
            var currentProcessName = "";
            
            var currentProcess;
            var processList = [];
            
            var startX, endX;
            
            for (var i = 0; i < processArray.length; i++)
            {
                currentProcess = processArray[i];
                
                if (currentProcessName == "" || currentProcess.name != currentProcessName)
                {
                    currentProcessName = currentProcess.name;
                    drawTextMaxWidth(5, drawY + 19, currentProcessName, "18px Calibri", "#000000", nameWidth - 10);
                    drawLine(0, drawY, chartCanvas.width, drawY, "#CCCCCC");
                    drawY += 30;
                    processList = [];
                }
                
                if (processList.length == 0)
                {
                    if (currentProcess.message == "Finish")
                    {
                        startX = nameWidth + 1;
                        endX = nameWidth + ((currentProcess.entryTime[11] + currentProcess.entryTime[12]) * hourWidth) + ((currentProcess.entryTime[14] + currentProcess.entryTime[15]) * minuteWidth);
                        drawProcessLine(startX, drawY - 14, endX, drawY - 14);
                    }
                }
                
                processList.push(currentProcess);
                
                if (i == processArray.length - 1 || (i > 0 && currentProcess.message == "Finish" && processArray[i + 1].message == "Start"))
                {
                    if (processList[processList.length - 1].message == "Start")
                    {
                        startX = nameWidth + ((processList[processList.length - 1].entryTime[11] + processList[processList.length - 1].entryTime[12]) * hourWidth) + ((processList[processList.length - 1].entryTime[14] + processList[processList.length - 1].entryTime[15]) * minuteWidth);
                        endX = chartCanvas.width;
                    }
                    else
                    {
                        startX = nameWidth + ((processList[0].entryTime[11] + processList[0].entryTime[12]) * hourWidth) + ((processList[0].entryTime[14] + processList[0].entryTime[15]) * minuteWidth);
                        endX = nameWidth + ((currentProcess.entryTime[11] + currentProcess.entryTime[12]) * hourWidth) + ((currentProcess.entryTime[14] + currentProcess.entryTime[15]) * minuteWidth);
                    }
                    
                    if (startX == endX)
                    {
                        drawProcessCircle(startX, drawY - 14);
                    }
                    else
                    {
                        drawProcessLine(startX, drawY - 14, endX, drawY - 14);
                    }
                    processList = [];
                }
            }
            
            drawText(5, 20, "Process", "Bold 18px Calibri", "#176BC0");
            for (var i = 0; i < 25; i++)
            {
                var x = parseInt(i * hourWidth) + 0.5;
                
                if (i != 24)
                    drawLine(nameWidth + x, 0, nameWidth + x, chartCanvas.height, "#000000");

                if (i != 0)
                    drawText(nameWidth + 5 + x - hourWidth, 20, formatString((i - 1).toString(), 2), "Bold 18px Calibri", "#176BC0");
            }
            drawLine(0, yOffset, chartCanvas.width, yOffset, "#000000");
        }
        
        function processAsString(process)
        {
            return process.name + " " + process.message + " " + process.entryTime;
        }
        
        function drawProcessLine(x1, y1, x2, y2)
        {
            graphics.lineWidth = "5";
            drawLine(x1 + 2, y1 + 2, x2 + 2, y2 + 2, "#CCCCCC");
            graphics.lineWidth = "1";
            
            graphics.lineWidth = "5";
            drawLine(x1, y1, x2, y2, "#FF0000");
            graphics.lineWidth = "1";
        }
        
        function drawProcessCircle(x, y)
        {
            drawCircle(x + 2, y + 2, 2, "#CCCCCC");
            drawCircle(x, y, 2, "#FF0000");
        }
        
        function drawLine(x1, y1, x2, y2, colour)
        {
            graphics.strokeStyle = colour;
            graphics.beginPath();
            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.stroke();
        }
        
        function drawText(x, y, text, font, colour)
        {
            graphics.fillStyle = colour;
            graphics.font = font;
            graphics.fillText(text, x, y);
        }
        
        function drawCircle(x, y, radius, colour)
        {
            graphics.beginPath();
            graphics.arc(x, y, radius, 0, 2 * Math.PI, false);
            graphics.fillStyle = colour;
            graphics.fill();
            graphics.lineWidth = 1;
            graphics.strokeStyle = colour;
            graphics.stroke();
        }
        
        function drawTextMaxWidth(x, y, text, font, colour, max)
        {
            graphics.fillStyle = colour;
            graphics.font = font;
            graphics.fillText(text, x, y, max);
        }
        
        function formatString(text, places)
        {
            var formatted = text;
            
            if (text.length < places)
            {
                for (var i = 0; i < places - text.length; i++)
                {
                    formatted = "0" + formatted;
                }
            }
            return formatted;
        }
        
        function incrementDate(inc)
        {
            var newDate = new Date("<?php echo $inputDate; ?>");
            var day = newDate.getDate() + inc;
            var month = newDate.getMonth() + 1;
            var year = newDate.getFullYear();
            
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            
            newDate = year + "-" + month + "-" + day;
            window.location = "?date=" + newDate;
        }
        
        function setDate(d)
        {
            window.location = "?date=" + d;
        }
        
        function showDateInput()
        {
            chartCanvas.style.display = "none";
            document.getElementById("loadingIcon").style.display = "none";
            document.getElementById("errorMessage").style.display = "none";
            document.getElementById("dateInputContainer").style.opacity = "1.0";
        }
    </script>
</head>

<body>
    <div class="header">
        <div class="headerTitle">Process Chart</div>
        <div class="headerCurrentDate">Current Date: <?php echo $inputDate; ?></div>
        
        <ul class="navBar">
            <li class="examplesButton" onclick="window.location='?date=2015-09-23'">Example</li>
            <li onclick="showDateInput()">Set Date</li>
            <li class="arrow_right" onclick="incrementDate(1);"></li>
            <li class="arrow_left" onclick="incrementDate(-1);"></li>
        </ul>
    </div>
    <canvas id="chartCanvas" width="1024" height="<?php echo 30 + ($processCount * 30); ?>">Browser does not support HTML5 Canvas.</canvas>
    
    <div id="loadingIcon"></div>
    <div id="errorMessage">No processes recorded for this day.</div>
    <div id="dateInputContainer">
        <br/><br/>
        <span class="dateTitle">Enter the date to view the processes...</span><br/><br/>
        <input id="dateInput" class="dateInput" type="date" value="<?php echo date('Y-m-d'); ?>"></input><br/><br/>
        <input type="button" class="dateConfirmButton" value="Confirm" onclick="setDate(document.getElementById('dateInput').value)"></input>
    </div>
</body>

</html>