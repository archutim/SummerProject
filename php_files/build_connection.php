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

    $check_query = "SELECT * from " . $Post_data['user'] . " where Contact = '" . $Post_data['opponent'] . "';";

    $check_result = $con->query($check_query);
    
    if($check_result->num_rows == 0){
        $query1 = "insert into " . $Post_data['user'] . " (Contact, Last_message, sender) values ('" . $Post_data['opponent'] . "', '" . $Post_data['message'] . "', '" . $Post_data['user'] . "');";
        $query2 = "insert into " . $Post_data['opponent'] . " (Contact, Last_message, sender) values ('" . $Post_data['user'] . "', '" . $Post_data['message'] . "', '" . $Post_data['user'] . "');";
        $query3 = "insert into messages (sender, content, receiver) values ('" . $Post_data['user'] . "', '" . $Post_data['message'] . "', '" . $Post_data['opponent'] . "');";
        $result1 = $con->query($query1);
        $result2 = $con->query($query2);
        $result3 = $con->query($query3);
        echo json_encode($result1 && $result2 && $result3);
    }
    else{
        $query1 = "update " . $Post_data['user'] . " set Last_message = '" . $Post_data['message'] . "';";
        $query2 = "update " . $Post_data['opponent'] . " set Last_message = '" . $Post_data['message'] . "';";
        $query3 = "insert into messages (sender, content, receiver) values ('" . $Post_data['user'] . "', '" . $Post_data['message'] . "', '" . $Post_data['opponent'] . "');";
        $result1 = $con->query($query1);
        $result2 = $con->query($query2);
        $result3 = $con->query($query3);
        echo json_encode($result1 && $result2 && $result3);        
    }
?>
