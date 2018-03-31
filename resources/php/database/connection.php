<?php

$host = $_SERVER['DB_HOST'];
$username = $_SERVER['DB_USERNAME'];
$password = $_SERVER['DB_PASSWORD'];
$database = $_SERVER['DB_DATABASE'];
$port = $_SERVER['DB_PORT'];

$connection = new mysqli($host, $username, $password, $database, $port);

?>