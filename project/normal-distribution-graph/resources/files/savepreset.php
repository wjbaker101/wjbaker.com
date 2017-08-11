<?php

    $presetName = htmlspecialchars($_POST["name"]); // Gets the name parameter from the POST request
    $mean = $_POST["mean"]; // Gets the mean parameter from the POST request
    $standardDeviation= $_POST["standardDeviation"]; // Gets the standardDeviation parameter from the POST request
    $direction = $_POST["direction"]; // Gets the direction parameter from the POST request
    $defLine_zValue = $_POST["defLine_zValue"]; // Gets the defLine_zValue parameter from the POST request
    $secLine_zValue = $_POST["secLine_zValue"]; // Gets the secLine_zValue parameter from the POST request
    $secLine_displayed = $_POST["secLine_displayed"]; // Gets the secLine_displayed parameter from the POST request

    if (strlen($presetName) > 0) // Checks whether the name of the preset is not blank
    {
        $servername = "localhost"; // Stores the server name of the database
        $dbUsername = "wjbajaju_William"; // Stores the username of the database
        $dbPassword = "WilliamSQL1"; // Stores the password of the database
        $dbname = "wjbajaju_NormalDistribution"; // Stores the name of the database in the database

        $connect = new mysqli($servername, $dbUsername, $dbPassword, $dbname); // Creates a new MySQL object with the database parameters
        // Stores the MySQL query, inserts data in to the database with the POST request parameters
        $sql = "INSERT INTO GraphPresets(presetName, mean, standardDeviation, defaultDirection, defLine_zValue, secLine_displayed, secLine_zValue) VALUES('" . $presetName . "', " . $mean . ", " . $standardDeviation . ", " . $direction . ", " . $defLine_zValue . ", " . $secLine_displayed . ", " . $secLine_zValue . ")";

        $result = $connect->query($sql); // Executes the query

        if ($result) // Checks whether the result is valid
            echo "success"; // Responds with string "success"
        else
            echo 'failed'; // Responds with string "failed"

        $connect->close(); // Closes the connection to the database
    }
    else
        echo 'failed'; // Responds with string "failed"

?>