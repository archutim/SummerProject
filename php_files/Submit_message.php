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

    $query1 = "insert into messages (sender, content, receiver) values ('" . $Post_data['sender']. "', '" . $Post_data['content'] . "', '" . $Post_data['receiver'] . "');";
    $query2 = "update " . $Post_data['sender'] . " set Last_message = '" . $Post_data['content'] . "', sender = '" . $Post_data['sender'] . "' where Contact = '" . $Post_data['receiver'] . "';";
    $query3 = "update " . $Post_data['receiver'] . " set Last_message = '" . $Post_data['content'] . "', sender = '" . $Post_data['sender'] . "' where Contact = '" . $Post_data['sender'] . "';";
    $result1 = $con->query($query1);
    $result2 = $con->query($query2);
    $result3 = $con->query($query3);
    echo json_encode($result1 && $result2 && $result3);
?>
