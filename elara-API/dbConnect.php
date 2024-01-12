<?php
require __DIR__ . '/vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Cache-Control: no-cache, must-revalidate');
header("Content-Type: application/json; charset=UTF-8");
header("HTTP/1.1 200 OK");
$conn = mysqli_connect("localhost","root","","elara") or die("Could not connect to database");
$secret_key = "elara";