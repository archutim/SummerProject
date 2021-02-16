<?php
    require('config.php');
    $email = $_POST['email'];
    $password = $_POST['password'];
    if ($email == '' || $password == '')
    {
        // No login information
        header('Location: ../login.html');
    }
    else
    {
        // Authenticate user
        
        $con = new mysqli($db_host, $db_user, $db_pass, $db_name);
        if ($con->connect_error) {
            die("Connection failed: " . $con->connect_error);
        }
        echo "Connected successfully";

        $query = "SELECT userid, guid FROM users WHERE email = '$email' and password = SHA2('$password', 256)";
        
        //$query = "SELECT userid, email, password, guid FROM users";

        $result = $con->query($query);
        if($result->num_rows > 0){
            echo "Found";
            $row = $result->fetch_assoc();
            // Update the user record
            $gen_uid = MD5(rand() + $row['userid']);
            $id = $row['userid'];
            setcookie('SYVcookie', $gen_uid, time() + 1800);
            $query = "UPDATE users SET guid = '$gen_uid' WHERE userid = '$id'";
            $con->query($query);
            echo $row['userid'] . $row['guid'];
            header('Location: ../home.html');
        }
        else{
            header('Location: ../login.html');
        }
    }
?>