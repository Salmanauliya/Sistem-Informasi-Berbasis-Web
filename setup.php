<?php
// Konfigurasi Database
$hostname = 'localhost';
$username = 'root';
$password = '';

// Koneksi tanpa database
$conn = mysqli_connect($hostname, $username, $password);

if (!$conn) {
    die('❌ Error Koneksi: ' . mysqli_connect_error());
}

// Baca file SQL
$sqlFile = file_get_contents('database.sql');

// Jalankan query
if (mysqli_multi_query($conn, $sqlFile)) {
    echo '✅ Database berhasil dibuat!<br>';
    echo '<a href="index.php">👉 Klik di sini untuk membuka aplikasi</a>';
} else {
    echo '❌ Error: ' . mysqli_error($conn);
}

mysqli_close($conn);
?>
