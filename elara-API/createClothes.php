<?php
include_once 'dbConnect.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data)) {
    $name = $data->name;
    $price = $data->price;
    $discount = isset($data->discount) ? $data->discount : 1;
    $description = $data->description;
    $images = [];
    $colors = [];
    foreach ($data->images as $image) {
        $images[] = $image->path;
        $colors[] = $image->color;
    }
    $sizes = $data->sizes;
    if (sizeof($images) != sizeof($colors)) {
        echo json_encode(array("message" => "Imagens sem cores!"));
        http_response_code(502);
    } else {
        $sql = "SELECT * FROM clothes WHERE name = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("s", $name);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo json_encode(array("message" => "Roupa já cadastrada!"));
                http_response_code(400);
            } else {
                $stmt->close();
                $sql = "INSERT INTO clothes (name, price, discount, description) VALUES (?, ?, ?, ?)";
                if ($stmt = $conn->prepare($sql)) {
                    $stmt->bind_param("ssss", $name, $price, $discount, $description);
                    if ($stmt->execute()) {
                        $sql = "SELECT id FROM clothes WHERE name = ?";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("s", $name);
                        $stmt->execute();
                        $row = mysqli_fetch_assoc($stmt->get_result());
                        $stmt->close();
                        $id = $row['id'];
                        for ($i = 0; $i < sizeof($images); $i++) {
                            $sql = "INSERT INTO clothes_images (clothes_id, path, color) VALUES (?, ?, ?)";
                            if ($stmt = $conn->prepare($sql)) {
                                $stmt->bind_param("sss", $id, $images[$i], $colors[$i]);
                                if ($stmt->execute()) {
                                    $stmt->close();
                                    continue;
                                } else {
                                    $sql = "DELETE FROM clothes WHERE id = ?";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bind_param("s", $id);
                                    $stmt->execute();
                                    $stmt->close();
                                    echo json_encode(array("message" => "Erro ao criar roupa!"));
                                    http_response_code(502);
                                }
                            } else {
                                $sql = "DELETE FROM clothes WHERE id = ?";
                                $stmt = $conn->prepare($sql);
                                $stmt->bind_param("s", $id);
                                $stmt->execute();
                                $stmt->close();
                                echo json_encode(array("message" => "Erro ao criar roupa!"));
                                http_response_code(502);
                            }
                        }
                        for ($i = 0; $i < sizeof($sizes); $i++) {
                            $sql = "INSERT INTO clothes_sizes (clothes_id, size) VALUES (?, ?)";
                            if ($stmt = $conn->prepare($sql)) {
                                $stmt->bind_param("ss", $id, $sizes[$i]);
                                if ($stmt->execute()) {
                                    $stmt->close();
                                    continue;
                                } else {
                                    $sql = "DELETE FROM clothes WHERE id = ?";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bind_param("s", $id);
                                    $stmt->execute();
                                    $stmt->close();
                                    echo json_encode(array("message" => "Erro ao criar roupa!"));
                                    http_response_code(502);
                                }
                            } else {
                                $sql = "DELETE FROM clothes WHERE id = ?";
                                $stmt = $conn->prepare($sql);
                                $stmt->bind_param("s", $id);
                                $stmt->execute();
                                $stmt->close();
                                echo json_encode(array("message" => "Erro ao criar roupa!"));
                                http_response_code(502);
                            }
                        }
                        echo json_encode(array("message" => "Roupa criada com sucesso!"));
                        http_response_code(201);
                    } else {
                        echo json_encode(array("message" => "Erro ao criar roupa!"));
                        http_response_code(502);
                    }
                } else {
                    echo json_encode(array("message" => "Erro ao criar roupa!"));
                    http_response_code(502);
                }
            }
        }
        else {
            echo json_encode(array("message" => "Erro ao criar roupa!"));
            http_response_code(502);
        }
    }
}
