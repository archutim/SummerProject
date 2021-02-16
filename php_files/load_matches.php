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
        $query = "SELECT * from basketball_team where country = '" . $Post_data['country'] .
        "' and chosenYear = '" . $Post_data['chosenYear'];
    }
    else if($Post_data['kind'] == 'Volleyball'){
        $query = "SELECT * from volleyball_team where country = '" . $Post_data['country'] .
        "' and chosenYear = '" . $Post_data['chosenYear'];    
    }
    if($Post_data['chosenMonth'] != 'All')
        $query = $query . "' and chosenMonth = '" . $Post_data['chosenMonth'];
    if($Post_data['chosenDate'] != 'All')
        $query = $query . "' and chosenDate = '" . $Post_data['chosenDate'];
    
    $query = $query . "' and active = '1';";
    
    $result = $con->query($query);
    if($result->num_rows > 0){
        $data = array();
        $number = 0;
        while($row = $result->fetch_assoc()){
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
