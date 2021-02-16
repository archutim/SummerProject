<?php
    require "vendor/autoload.php";
    use \Firebase\JWT\JWT;
    require('config.php');
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json");

    $json = file_get_contents('php://input');
    $Post_data = json_decode($json, true);

    $con = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }

    $query = "SELECT * from account where user = '" . $Post_data['user'] . "' and password = '" . $Post_data['password'] . "';";

    $result = $con->query($query);
    if($result->num_rows > 0){
        $payload = [
            "user" => $Post_data['user'],
            "password" => $Post_data['password'],
            "time" => time()
        ];
        $jwt = JWT::encode($payload, $private_key);
        setcookie('token', $jwt, time() + 60);
        $query = "update account set token = '" . $jwt . "' where user = '" . $Post_data['user'] . "';";
        $result = $con->query($query);
        echo json_encode('true');
    }
    else{
        echo json_encode('false');
    }
?>
