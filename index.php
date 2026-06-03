<?php
require_once 'config.php';

// Proses Create Data
$message = '';
$messageType = '';
$usernameValue = '';
$emailValue = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create'])) {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $usernameValue = $username;
    $emailValue = $email;
    
    // Validasi tidak kosong
    if (empty($username) || empty($email)) {
        $message = 'Username dan Email tidak boleh kosong!';
        $messageType = 'error';
    }
    // Validasi format email
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Format email tidak valid!';
        $messageType = 'error';
    }
    else {
        // Tambah user
        if (addUser($username, $email)) {
            $message = 'Data berhasil ditambahkan!';
            $messageType = 'success';
            $usernameValue = '';
            $emailValue = '';
        } else {
            $message = 'Username atau Email sudah terdaftar!';
            $messageType = 'error';
        }
    }
}

// Ambil semua data untuk ditampilkan
$users = getAllUsers();
// Sort by id descending
usort($users, function($a, $b) {
    return $b['id'] - $a['id'];
});

// Cek parameter message dari delete
if (isset($_GET['message'])) {
    if ($_GET['message'] == 'deleted') {
        $message = 'Data berhasil dihapus!';
        $messageType = 'success';
    } elseif ($_GET['message'] == 'error') {
        $message = 'Gagal menghapus data!';
        $messageType = 'error';
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD PHP Native</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>CRUD Data User</h1>
        
        <!-- Toast Notifikasi -->
        <div id="toast" class="toast <?php echo $messageType; ?> <?php echo $message ? 'show' : ''; ?>">
            <span id="toastMessage"><?php echo $message; ?></span>
            <button class="toast-close" onclick="closeToast()">×</button>
        </div>
        
        <!-- Card Form Create Data -->
        <div class="card">
            <h2>Create Data</h2>
            <form method="POST" action="" id="createForm">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" 
                           placeholder="Masukkan username"
                           value="<?php echo htmlspecialchars($usernameValue); ?>">
                    <div class="error-text" id="usernameError"></div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" 
                           placeholder="Masukkan email"
                           value="<?php echo htmlspecialchars($emailValue); ?>">
                    <div class="error-text" id="emailError"></div>
                </div>
                
                <button type="submit" name="create" class="btn btn-primary">Submit</button>
            </form>
        </div>
        
        <!-- Card Tabel Data User -->
        <div class="card">
            <h2>Data User</h2>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (count($users) > 0): ?>
                            <?php foreach ($users as $row): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row['username']); ?></td>
                                <td><?php echo htmlspecialchars($row['email']); ?></td>
                                <td class="actions">
                                    <a href="edit.php?id=<?php echo $row['id']; ?>" class="btn btn-edit">Edit</a>
                                    <button type="button" class="btn btn-delete" onclick="confirmDelete(<?php echo $row['id']; ?>, '<?php echo htmlspecialchars($row['username']); ?>')">Delete</button>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr class="empty-row">
                                <td colspan="3" style="text-align: center; padding: 40px; color: #999;">
                                    Belum ada data
                                </td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- Modal Konfirmasi Delete -->
    <div id="deleteModal" class="modal">
        <div class="modal-content">
            <h3>Konfirmasi Hapus</h3>
            <p>Apakah Anda yakin ingin menghapus user <strong id="deleteUsername"></strong>?</p>
            <div class="modal-buttons">
                <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
                <a href="#" id="deleteLink" class="btn btn-delete">Hapus</a>
            </div>
        </div>
    </div>
    
    <script>
        // Auto close toast after 3 seconds
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
        
        function confirmDelete(id, username) {
            document.getElementById('deleteUsername').innerText = username;
            document.getElementById('deleteLink').href = 'delete.php?id=' + id;
            document.getElementById('deleteModal').style.display = 'flex';
        }
        
        function closeModal() {
            document.getElementById('deleteModal').style.display = 'none';
        }
        
        // Tutup modal jika klik di luar
        window.onclick = function(event) {
            var modal = document.getElementById('deleteModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
        
        // Client-side validation sebelum submit
        document.getElementById('createForm').addEventListener('submit', function(e) {
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
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').innerText = 'Format email tidak valid!';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        function isValidEmail(email) {
            var re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            return re.test(email);
        }
        
        // Tampilkan error dari server jika ada (untuk duplikat)
        <?php if ($messageType === 'error' && !empty($message) && $message === 'Username atau Email sudah terdaftar!'): ?>
        var username = document.getElementById('username').value.trim();
        var email = document.getElementById('email').value.trim();
        if (username !== '' && email !== '') {
            document.getElementById('usernameError').innerText = 'Username atau Email sudah terdaftar!';
            document.getElementById('usernameError').style.display = 'block';
        }
        <?php endif; ?>
    </script>
</body>
</html>