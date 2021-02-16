<?php
    require "vendor/autoload.php";
    use \Firebase\JWT\JWT;
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json");
    $data = ["fir"=>10, "sec"=>15];
    
    $key = "exser";
    $payload = [
       "iss" => "e.org",
       "aud" => "tedawr",
       "iat" => 1356999524,
       "nbf" => 1357000000
    ];
    $jwt = JWT::encode($payload, $key);
    setcookie('token', $jwt, time() + 60);
    echo json_encode($data);
?>