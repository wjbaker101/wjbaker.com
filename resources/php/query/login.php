<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

echo json_encode(Query::login($_POST['username'], $_POST['password']));

?>