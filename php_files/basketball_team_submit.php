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
    $check_query = "select * from basketball_team where user = '" . $Post_data['user'] . "';";
    $check_result = $con->query($check_query);
    if($check_result->num_rows < 3){
     $query = "insert into basketball_team (user, country, area, name1, role1, age1, tall1,
                 name2, role2, age2, tall2, name3, role3, age3, tall3, name4, role4, age4, tall4,
                 name5, role5, age5, tall5, chosenDate, chosenMonth, chosenYear, team_name, active)
                 values ('" . $Post_data['user'] . "', '" . $Post_data['country'] . "', '" . $Post_data['area'] .
                 "', '" . $Post_data['member1'][0] . "', '" . $Post_data['member1'][1]. "', '" . $Post_data['member1'][2] . "', '" . $Post_data['member1'][3] .
                 "', '" . $Post_data['member2'][0] . "', '" . $Post_data['member2'][1]. "', '" . $Post_data['member2'][2] . "', '" . $Post_data['member2'][3] .
                 "', '" . $Post_data['member3'][0] . "', '" . $Post_data['member3'][1]. "', '" . $Post_data['member3'][2] . "', '" . $Post_data['member3'][3] .
                 "', '" . $Post_data['member4'][0] . "', '" . $Post_data['member4'][1]. "', '" . $Post_data['member4'][2] . "', '" . $Post_data['member4'][3] .
                 "', '" . $Post_data['member5'][0] . "', '" . $Post_data['member5'][1]. "', '" . $Post_data['member5'][2] . "', '" . $Post_data['member5'][3] . 
                 "', '" . $Post_data['chosenDate'] . "', '" . $Post_data['chosenMonth']. "', '" . $Post_data['chosenYear'] . "', '" . $Post_data['team_name'] . "', false);";

     $result = $con->query($query);

    echo json_encode($result);
    }
    else{
        echo json_encode("Can't create more than three teams!");    
    }
?>