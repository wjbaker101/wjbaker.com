<?php
    
    $id = $_POST["id"]; // Gets the id parameter from the POST request

    if ($id != NULL) // Checks whether the id is equal to NULL
    {
        $servername = "localhost"; // Stores the server name of the database
        $dbUsername = "wjbajaju_William"; // Stores the username of the database
        $dbPassword = "WilliamSQL1"; // Stores the password of the database
        $dbname = "wjbajaju_NormalDistribution"; // Stores the name of the database in the database

        $connect = new mysqli($servername, $dbUsername, $dbPassword, $dbname); // Creates a new MySQL object with the database parameters
        $sql = "DELETE FROM GraphPresets WHERE presetID=" . $id; // Stores the MySQL query, deletes from the GraphPresets table when the id is equal to id

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