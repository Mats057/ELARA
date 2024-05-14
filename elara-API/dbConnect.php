<?php
$conn = mysqli_connect("localhost","root","","elara") or die("Could not connect to database");
if(!$conn){
    echo json_encode(array("message" => mysqli_connect_error()));
    http_response_code(500);
    exit();
}
$secret_key = "elara";