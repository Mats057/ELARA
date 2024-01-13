<?php
include_once 'default.php';
include_once 'dbConnect.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$sql = "SELECT * FROM clothes WHERE id = ?";
if($stmt = $conn->prepare($sql)){
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $clothes = mysqli_fetch_assoc($result);
        $stmt->close();
        $sql = "SELECT * FROM clothes_images WHERE clothes_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $clothes_img = $stmt->get_result();
        $clothes['images'] = array();
        while($row = mysqli_fetch_assoc($clothes_img)){
            $clothes['images'][] = array(
                'path' => $row['path'],
                'color' => $row['color']
            );
        }
        $stmt->close();
        $sql = "SELECT * FROM clothes_sizes WHERE clothes_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $clothes_sizes = $stmt->get_result();
        $clothes['sizes'] = array();
        while($row = mysqli_fetch_assoc($clothes_sizes)){
            $clothes['sizes'][] = $row['size'];
        }
        $stmt->close();
        echo json_encode($clothes);
        http_response_code(200);
    } else {
        http_response_code(204);
    }
}