<?php

include_once 'default.php';
include_once 'dbConnect.php';
header("Access-Control-Expose-Headers: Authorization");


use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $token = getToken();
    } catch (Exception $e) {
        echo json_encode(array("message" => $e->getMessage()));
        http_response_code(401);
        exit();
    }


    try {
        $tokenData = JWT::decode($token, new Key($secret_key, 'HS256'));
    } catch (Exception $e) {
        echo json_encode(array("message" => $e->getMessage()));
        http_response_code(401);
        exit();
    }

    $tokenData = json_decode(json_encode($tokenData), true);
    $id = $tokenData[0];
    $email = $tokenData[1];
    $sql = "SELECT * FROM users WHERE id = ? AND email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $id, $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user = mysqli_fetch_assoc($result);
        $stmt->close();
        echo json_encode($user);
        http_response_code(200);
    } else {
        echo json_encode(array('message' => 'No user found'));
        http_response_code(204);
    }
}

