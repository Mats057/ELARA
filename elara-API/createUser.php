<?php
include_once 'dbConnect.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data)) {
    $first_name = $data->name;
    $last_name = $data->lastName;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(array("message" => "Usuário já cadastrado!"));
        http_response_code(400);
    } else {
        $sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ssss", $first_name, $last_name, $email, $password);
            if ($stmt->execute()) {
                echo json_encode(array("message" => "Usuário criado com sucesso!"));
                http_response_code(201);
            } else {
                echo json_encode(array("message" => "Erro ao criar usuário!"));
                http_response_code(502);
            }
        } else {
            echo json_encode(array("message" => "Erro ao criar usuário!"));
            http_response_code(502);
        }
    }
}
