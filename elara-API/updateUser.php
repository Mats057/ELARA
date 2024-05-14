<?php 
include_once 'default.php';
include_once 'dbConnect.php';
header("Access-Control-Expose-Headers: Authorization");
header("Access-Control-Allow-Methods: PUT");


use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);
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

    $newEmail = $_POST['email'];
    $newFirstName = $_POST['firstName'];
    $newLastName = $_POST['lastName'];
    $newPhone = $_POST['phone'];


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
        $sql = "UPDATE users SET email = ?, first_name = ?, last_name = ?, phone = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $newEmail, $newFirstName, $newLastName, $newPhone, $id);
        $stmt->execute();
        $stmt->close();
        try {
            $token = JWT::encode([$id, $newEmail], $secret_key, 'HS256');
            header('Authorization: Bearer ' . $token);
            echo json_encode(array('message' => 'User updated'));
            http_response_code(200);
        } catch (Exception $e) {
            echo json_encode(array("message" => $e->getMessage()));
            http_response_code(401);
            exit();
        }
    } else {
        echo json_encode(array('message' => 'No user found'));
        http_response_code(204);
    }
}


