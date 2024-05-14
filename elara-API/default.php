<?php
require __DIR__ . '/vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Cache-Control: no-cache, must-revalidate');
header("Content-Type: application/json; charset=UTF-8");
header("HTTP/1.1 200 OK");

if (!function_exists('getallheaders')) {
    function getallheaders() {
    $headers = [];
    foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
            $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        }
    }
    return $headers;
    }
}
function getToken()
{
    $headers = getallheaders();
    $bearerToken = isset($headers['Authorization']) ? $headers['Authorization'] : null;
    $bearerToken = isset($bearerToken) ? str_replace('Bearer ', '', $bearerToken): null;
    return $bearerToken;
}