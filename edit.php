<?php
require_once 'config.php';

$message = '';
$messageType = '';
$user = null;

// Ambil data user berdasarkan ID
if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $user = getUserById($id);
    
    if (!$user) {
        header("Location: index.php");
        exit();
    }
}

// Proses Update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
    $id = (int)$_POST['id'];
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    
    // Validasi
    if (empty($username) || empty($email)) {
        $message = 'Username dan Email tidak boleh kosong!';
        $messageType = 'error';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Format email tidak valid!';
        $messageType = 'error';
    } else {
        // Edit user
        if (editUser($id, $username, $email)) {
            $message = 'Data berhasil diupdate!';
            $messageType = 'success';
            // Refresh data
            $user = getUserById($id);
        } else {
            $message = 'Username atau Email sudah digunakan oleh user lain!';
            $messageType = 'error';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data - CRUD PHP</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Edit Data User</h1>
        
        <!-- Toast Notifikasi -->
        <div id="toast" class="toast <?php echo $messageType; ?> <?php echo $message ? 'show' : ''; ?>">
            <span id="toastMessage"><?php echo $message; ?></span>
            <button class="toast-close" onclick="closeToast()">×</button>
        </div>
        
        <div class="card">
            <form method="POST" action="" id="editForm">
                <input type="hidden" name="id" value="<?php echo $user['id']; ?>">
                
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" 
                           value="<?php echo htmlspecialchars($user['username']); ?>">
                    <div class="error-text" id="usernameError"></div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" 
                           value="<?php echo htmlspecialchars($user['email']); ?>">
                    <div class="error-text" id="emailError"></div>
                </div>
                
                <div class="form-group">
                    <button type="submit" name="update" class="btn btn-primary">Update</button>
                    <a href="index.php" class="btn btn-secondary">Kembali</a>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        setTimeout(function() {
            var toast = document.getElementById('toast');
            if (toast && toast.classList.contains('show')) {
                toast.classList.remove('show');
            }
        }, 3000);
        
        function closeToast() {
            var toast = document.getElementById('toast');
            if (toast) {
                toast.classList.remove('show');
            }
        }
        
        document.getElementById('editForm').addEventListener('submit', function(e) {
            var username = document.getElementById('username').value.trim();
            var email = document.getElementById('email').value.trim();
            var isValid = true;
            
            document.getElementById('usernameError').innerText = '';
            document.getElementById('emailError').innerText = '';
            document.getElementById('usernameError').style.display = 'none';
            document.getElementById('emailError').style.display = 'none';
            
            if (username === '') {
                document.getElementById('usernameError').innerText = 'Username tidak boleh kosong!';
                document.getElementById('usernameError').style.display = 'block';
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('emailError').innerText = 'Email tidak boleh kosong!';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
                document.getElementById('emailError').innerText = 'Format email tidak valid!';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) e.preventDefault();
        });
    </script>
</body>
</html>