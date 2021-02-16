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
        $query = "delete from basketball_team where id = '" . $Post_data['id'] . "';";
    }
    else if($Post_data['kind'] == 'Volleyball'){
        $query = "delete from volleyball_team where id = '" . $Post_data['id'] . "';";
    }
    $result = $con->query($query);
    echo json_encode($result);
?>
