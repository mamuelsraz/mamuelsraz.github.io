<?php

// servername => localhost
// username => root
// password => empty
// database name => staff
$conn = mysqli_connect("localhost", "root", "", "participants");

// Check connection
if ($conn === false) {
    die("ERROR: Could not connect. "
        . mysqli_connect_error());
}

// Taking all 5 values from the form data(input)
$firstName =  $_REQUEST['firstName'];
$lastName = $_REQUEST['lastName'];
$email = $_REQUEST['email'];
$presentOptions = $_REQUEST['presentOptions'];
$grant = (isset($_POST['grant']));
$student = (isset($_POST['student']));
$banquet = (isset($_POST['banquet']));
$excursion = (isset($_POST['excursion']));
$institution = $_REQUEST['institution'];
$department = $_REQUEST['department'];
$street = $_REQUEST['street'];
$city = $_REQUEST['city'];
$zip = $_REQUEST['zip'];
$country = $_REQUEST['country'];
$title = $_REQUEST['title'];
$authors = $_REQUEST['authors'];
$affiliations = $_REQUEST['affiliations'];
$abstract = $_REQUEST['abstract'];


// Performing insert query execution
// here our table name is college
$sql = "INSERT INTO participants  VALUES ('$firstName', 
      '$lastName','$email','$presentOptions','$grant','$student','$banquet',
      '$excursion','$institution', '$department', '$street', '$city', '$zip',
     '$country', '$title', '$authors', '$affiliations', '$abstract', now())";

if (mysqli_query($conn, $sql)) {
    echo "<h3>Thanks for registering to the symposium!</h3>";
    echo nl2br("\n$firstName\n $lastName\n "
        . "$email\n ");
    echo "You can close this window now.";

    mail($email, "Symposium", "you are registered!");


} else {
    echo "ERROR: Hush! Sorry $sql. "
        . mysqli_error($conn);
}

// Close connection
mysqli_close($conn);

?>