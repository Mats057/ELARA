<?php
include_once 'dbConnect.php';
header("Access-Control-Expose-Headers: Authorization");

use \Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$password = $data->password;

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$resultUser = $stmt->get_result();
if($resultUser->num_rows > 0){
    $user = mysqli_fetch_assoc($resultUser);
    $stmt->close();
    if(password_verify($password, $user['password'])){
        $token = JWT::encode([$user['id'], $user['email']], $secret_key, 'HS256');
        header('Authorization: Bearer ' . $token);
        echo json_encode(array("message" => "Login realizado com sucesso!"));
        http_response_code(200);
    } else {
        echo json_encode(array("message" => "Senha incorreta!"));
        http_response_code(200);
    }
} else {
    echo json_encode(array("message" => "Usuário não encontrado!"));
    http_response_code(200);
}