<?php
    require "vendor/autoload.php";
    require('config.php');
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json");

    $json = file_get_contents('php://input');
    $Post_data = json_decode($json, true);

    $con = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }
    if($Post_data['kind'] == 'Basketball'){
        $query = "SELECT * from basketball_team  where user = '" . $Post_data['user'] . "';";
    }
    else if($Post_data['kind'] == 'Volleyball'){
        $query = "SELECT * from volleyball_team  where user = '" . $Post_data['user'] . "';";
    }
    $result = $con->query($query);
    if($result->num_rows > 0){
        $data = array();
        while($row = $result->fetch_assoc()){
            array_push($data, $row);
        }
        echo json_encode($data , JSON_FORCE_OBJECT);
    }
?>