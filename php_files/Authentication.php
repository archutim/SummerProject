<?php
    require('config.php');
    // Check for a cookie, if none go to login page
    if (!isset($_COOKIE['SYVcookie']))
    {
        echo 'Login';
    }
    else{
        $con = new mysqli($db_host, $db_user, $db_pass, $db_name);
        if ($con->connect_error) {
            die("Connection failed: " . $con->connect_error);
        }
        $guid = $_COOKIE['SYVcookie'];
        $query = "SELECT email FROM users WHERE guid = '$guid'";
        $result = $con->query($query);
        if($result->num_rows > 0){
            echo $result->fetch_assoc()['email'];
            //echo $row['userid'];
        }
        else{
            echo "Login";
        }
    }
?>