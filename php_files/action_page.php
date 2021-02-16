<?php
$servername = "localhost";
$username = "archutim";
$password = "zxc89050223";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?> 
<!DOCTYPE HTML>
<html>
    <head>
        <meta charest="utf-8">
        <title>Response</title>
    </head>
    <body>

    Welcome <?php echo $_POST["name"]; ?><br>
    Your email address is: <?php echo $_POST["lname"]; ?>

    </body>
</html> 
