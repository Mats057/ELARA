<?php


include_once 'default.php';
include_once 'dbConnect.php';
header("Access-Control-Expose-Headers: Authorization");
header("Access-Control-Allow-Methods: DELETE");

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
    echo json_encode(array("message" => "Method not supported"));
    http_response_code(200);
    exit();
} else {
    include_once 'dbConnect.php';
    header("Access-Control-Expose-Headers: Authorization");
    $token = getToken();
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
    $sql = "DELETE FROM users WHERE id = ? AND email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $id, $email);

    try {
        $stmt->execute();
    } catch (Exception $e) {
        echo json_encode(array("message" => $e->getMessage()));
        http_response_code(401);
        exit();
    }
    echo json_encode(array("message" => "User deleted"));
    http_response_code(200);
    exit();
}
