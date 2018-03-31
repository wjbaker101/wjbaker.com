<?php

    $response = "failed"; // Sets the initial value of the response to "failed"

    $servername = "localhost"; // Stores the server name of the database
    $dbUsername = "wjbajaju_William"; // Stores the username of the database
    $dbPassword = "WilliamSQL1"; // Stores the password of the database
    $dbname = "wjbajaju_NormalDistribution"; // Stores the name of the database in the database

    $connect = new mysqli($servername, $dbUsername, $dbPassword, $dbname); // Creates a new MySQL object with the database parameters
    $sql = "SELECT * FROM GraphPresets"; // Stores the MySQL query, selects everything from the table
    $result = $connect->query($sql); // Executes the query

    if ($result->num_rows > 0) // Checks if the result contains any data
    {
        $response = ""; // Clears the response
        while($row = $result->fetch_assoc()) // Iterates as long as there is something to read
        {
            // Stores the string which will be a parameter in the response
            $parameter = '[' . $row["presetID"] . ', \'' . str_replace("'", "\\'", $row["presetName"]) . '\', ' . $row["mean"] . ', ' . $row["standardDeviation"] . ', ' . $row["defaultDirection"] . ', ' . $row["defLine_zValue"] . ', ' . $row["secLine_displayed"] . ', ' . $row["secLine_zValue"] . ']';

            // Appends the current preset to the response
            $response = $response . '<div class="presetContainer" id="' . $row["presetID"] . '" onclick="var para = ' . $parameter . '; showPresetDetails(para);">' . $row["presetName"] . '</div>';
        }
    }
    else
        $response = "<span>No graphs to load.</span>"; // Sets reponse to error message

    echo $response; // Responds with string

?>