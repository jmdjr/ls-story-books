 <?php
	//Variables for connecting to your database.
	//These variable values come from your hosting account.
	$hostname = "LSStoryBooks.db.11768795.hostedresource.com";
	$username = "LSStoryBooks";
	$dbname = "LSStoryBooks";
	$password = "Katlover0!";

	//These variable values need to be changed by you before deploying
	$usertable = "User";
	$yourfield = "UserName";
	
	$userName = $_GET['u'];
	$chapter = $_GET['c'];
	
	// gets all pages and 

	//Connecting to your database
	/*
	mysql_connect($hostname, $username, $password) OR DIE ("Unable to 
	connect to database! Please try again later.");
	mysql_select_db($dbname);*/
	
	$mysqli = new mysqli($hostname, $username, $password, $dbname);
	
	if($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	
	//Fetching from the database table
	
	$errors = "";
	
	$pages = "CALL GetChapterPagesForPlay('$userName', '$chapter');";
	$result_pages = $mysqli->query($pages);
	$row_pages = array();
	
	if($result_pages)
	{
		while($r = $result_pages->fetch_assoc())
		{
			$row_pages[] = $r;
		}
		
		$result_pages->close();
		$mysqli->next_result();
	}
	else
	{
		$errors = $errors . "Pages failed to load.  ";
	}
	
	$choices = "CALL GetChapterChoicesForPlay('$userName', '$chapter')";
	$result_choices = $mysqli->query($choices);
	$row_choices = array();
	
	if($result_choices)
	{
		while($c = $result_choices->fetch_assoc())
		{
			$row_choices[] = $c;
		}
		
		$result_choices->close();
		$mysqli->next_result();
	}
	else
	{
		$errors = $errors . "Choices failed to load.  ";
	}
	
	print "{ ";
	
	if($errors != "") {
		print $errors;
	}
	else
	{
		print "pages: ";
		print json_encode($row_pages);
		print ", choices: ";
		print json_encode($row_choices);
	}
	
	print " }";
	
	$mysqli->close();
?>