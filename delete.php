<?php
require_once 'config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    if (deleteUser($id)) {
        header("Location: index.php?message=deleted");
    } else {
        header("Location: index.php?message=error");
    }
} else {
    header("Location: index.php");
}
exit();
?>