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

    $query = "SELECT * from messages where (sender = '" . $Post_data['sender'] . "' and receiver = '" . $Post_data['receiver'] . "') or (sender = '" . $Post_data['receiver'] . "' and receiver = '" . $Post_data['sender'] . "') order by Submission_Time desc;";

    $result = $con->query($query);
    if($result->num_rows > 0){
        $data = array();
        $number = 0;
        while($row = $result->fetch_assoc() /*&& $number < $Post_data['serial']*/){
            if($number < $Post_data['serial']){
                array_push($data, $row);
                $number ++;
            }
            else{
                break;
            }
        }
        echo json_encode($data , JSON_FORCE_OBJECT);
    } 
?>
