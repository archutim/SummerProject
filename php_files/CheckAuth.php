
<?php
    require "vendor/autoload.php";
    require("config.php");
    use \Firebase\JWT\JWT;
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json");

    if(!isset($_COOKIE['token'])){
        echo json_encode('WithOut Token');
    }
    else{
        $token = $_COOKIE['token'];
        try{
            $dejwt = (array) JWT::decode($token, $private_key, array('HS256'));
            $con = new mysqli($db_host, $db_user, $db_pass, $db_name);
            
            if ($con->connect_error) {
                die("Connection failed: " . $con->connect_error);
            }

            $query = "SELECT * from account where token = '" . $token . "';";

            $result = $con->query($query);
            if($result->num_rows > 0 && $dejwt['time'] >  time() - 60){
                echo json_encode($dejwt['user']);
            }
            else{
                echo json_encode('false');
            }
        }catch(Exception $err){
            echo json_encode('false');
        }
    }
?>
