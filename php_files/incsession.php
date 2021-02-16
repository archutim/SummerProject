<?php
    require('config.php');

    // Check for a cookie, if none go to login page
    if (!isset($_COOKIE['session_id']))
    {
        header('Location: login.php?refer='. urlencode(getenv('REQUEST_URI')));
    }

    // Try to find a match in the database
    $guid = $_COOKIE['session_id'];
    $con = new mysqli($db_host, $db_user, $db_pass, $db_name);
    $query = "SELECT userid FROM users WHERE guid = '$guid'";
    $result = $con->query($query);

    if ($result->num_rows == 0)
    {
        // No match for guid
        header('Location: login.php?refer='. urlencode(getenv('REQUEST_URI')));
    }
?>