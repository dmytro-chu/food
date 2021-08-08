<?php
$_POST = json_decode(file_get_contents("php://input"), true); //Эта строчка для работы с JSON
echo var_dump($_POST);