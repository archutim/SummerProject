<!DOCTYPE HTML>
<html>

<head lang="en">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	<title>SYV_Search</title>
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/home.css">
	<script src="../js/jquery-3.4.1.slim.min.js"
		integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
		crossorigin="anonymous"></script>
	<script src="../js/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script src="../js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
		crossorigin="anonymous"></script>
</head>

<body style="background-color: rgba(255, 251, 0, 0.322);">
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand">Sunshine Youth Volunteers</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="../home.html">Home <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link"
						href="https://www.facebook.com/2016%E9%AD%94%E5%8A%9B%E5%B0%8F%E6%88%B0%E5%A3%AB%E5%85%92%E7%AB%A5%E6%88%90%E9%95%B7%E7%87%9F-1732866006991163/"
						target="_blank">facebook</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="../partner.html">Partners Intro.</a>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
						data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Activities
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="../Activity1.html">Taoyuan Elementarty School</a>
					</div>
				</li>
			</ul>
			<form class="form-inline my-2 my-lg-0" action="./Search.php" method="POST">
				<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
		</div>
	</nav>
	<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="../home.html">Home</a></li>
		</ol>
    </nav>
	<p style="font-style: herit; font-size: 50px; text-align: center; color: rgba(47, 189, 214, 0.87);">
		<?php echo("No result.");	?>
	</p>
	<?php
$servername = "localhost";
$username = "archutim";
$password = "zxc89050223";
$dbname = "syv";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->query("SET NAMES 'utf8'");
$sql = "SELECT partners_id, name, department, team FROM partners";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["partners_id"]."</td><td>".$row["name"]." ".$row["department"]."</td></tr>".$row["team"];
    }
    echo "</table>";
} else {
    echo "0 results";
}
$conn->close();
?> 
</body>
</html>