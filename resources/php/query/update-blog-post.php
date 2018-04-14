<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/resources/php/database/query.php');

echo json_encode(Query::updateBlogPost($_POST['id'], $_POST['title'], $_POST['content']));

?>