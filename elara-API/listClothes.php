<?php
include_once 'default.php';
include_once 'dbConnect.php';

$sql = "SELECT * FROM clothes";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) > 0){
    $clothes = array();
    while($row = mysqli_fetch_assoc($result)){
        $clothes[] = $row;
        $sql = "SELECT * FROM clothes_images WHERE clothes_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $row['id']);
        $stmt->execute();
        $clothes_img = $stmt->get_result();
        $clothes[sizeof($clothes) - 1]['images'] = array();
        while($rowImg = mysqli_fetch_assoc($clothes_img)){
            $clothes[sizeof($clothes) - 1]['images'][] = array(
                'path' => $rowImg['path'],
                'color' => $rowImg['color']
            );
        }
        $stmt->close();
        $sql = "SELECT * FROM clothes_sizes WHERE clothes_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $row['id']);
        $stmt->execute();
        $clothes_sizes = $stmt->get_result();
        $clothes[sizeof($clothes) - 1]['sizes'] = array();
        while($row = mysqli_fetch_assoc($clothes_sizes)){
            $clothes[sizeof($clothes) - 1]['sizes'][] = $row['size'];
        }
        $stmt->close();
    }
    echo json_encode($clothes);
    http_response_code(200);
} else {
    http_response_code(204);
}