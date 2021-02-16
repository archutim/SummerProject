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
    $query = "select * from account where user = '" . $Post_data['user'] . "';";

    $result = $con->query($query);
    
    if($result->num_rows > 0){
        echo json_encode('Account has been used.');
    }
    else{
        $payload = [
            "user" => $Post_data['user'],
            "password" => $Post_data['password'],
            "time" => time()
        ];
        $jwt = JWT::encode($payload, $private_key);
        setcookie('token', $jwt, time() + 60);
        
        $query = "insert into account (user, password, token) values ('" . $Post_data['user']. "', '" . $Post_data['password'] . "', '" . $jwt . "');";
        $result = $con->query($query);
        
        $query = "create table " . $Post_data['user'] . " (Contact varchar(32) not null, Last_submission timestamp not null default current_timestamp on update current_timestamp, Last_message varchar(100) not null, sender varchar(32) not null, primary key(Last_submission));";
        $result = $con->query($query);
        echo json_encode('Sing up successfully.');
    }
?>
