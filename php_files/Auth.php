<?php
    require "vendor/autoload.php";
    use \Firebase\JWT\JWT;
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json");
    
    if(!isset($_COOKIE['token'])){
        echo json_encode('WithOut Token');
    }
    else{
        $token = $_COOKIE['token'];
        $key = 'exser';
        try{
            $dejwt = JWT::decode($token, $key, array('HS256'));
            echo json_encode('Auth!');
        }catch(Exception $err){
            echo json_encode('Wrong data');
        }
    }
?>