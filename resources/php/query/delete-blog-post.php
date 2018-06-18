<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

echo json_encode(Query::deleteBlogPost($_GET['id']));

?>