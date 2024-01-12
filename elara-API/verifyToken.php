<?php
include_once 'dbConnect.php';
header("Access-Control-Expose-Headers: Authorization");

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$token = getToken();
try {
    $tokenData = JWT::decode($token, new Key($secret_key, 'HS256'));
} catch (Exception $e) {
    echo json_encode(array("message" => "Acesso negado!"));
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
$resultUser = $stmt->get_result();
if ($resultUser->num_rows == 0) {
    echo json_encode(array("message" => "Acesso negado!"));
    http_response_code(401);
    exit();
}
echo json_encode(array("message" => "Acesso permitido!"));
http_response_code(200);

function getToken()
{
    $headers = getallheaders();
    $bearerToken = $headers['Authorization'];
    $bearerToken = str_replace('Bearer ', '', $bearerToken);
    return $bearerToken;
}
