<?php
// Konfigurasi File-based JSON Storage
define('DATA_FILE', __DIR__ . '/data.json');

// Initialize data file jika belum ada
if (!file_exists(DATA_FILE)) {
    $initialData = json_encode(['users' => [], 'nextId' => 1], JSON_PRETTY_PRINT);
    file_put_contents(DATA_FILE, $initialData);
}

// Baca data dari file JSON
function getAllUsers() {
    $json = file_get_contents(DATA_FILE);
    $data = json_decode($json, true);
    return isset($data['users']) ? $data['users'] : [];
}

// Simpan data ke file JSON
function saveUsers($users) {
    $data = [
        'users' => $users,
        'nextId' => count($users) > 0 ? max(array_column($users, 'id')) + 1 : 1
    ];
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT));
}

// Tambah user baru
function addUser($username, $email) {
    $users = getAllUsers();
    $data = json_decode(file_get_contents(DATA_FILE), true);
    
    // Cek duplikat
    foreach ($users as $user) {
        if ($user['username'] === $username || $user['email'] === $email) {
            return false;
        }
    }
    
    $newUser = [
        'id' => $data['nextId'],
        'username' => $username,
        'email' => $email,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    $users[] = $newUser;
    saveUsers($users);
    return true;
}

// Edit user
function editUser($id, $username, $email) {
    $users = getAllUsers();
    
    // Cek duplikat (exclude user yang sedang diedit)
    foreach ($users as $user) {
        if ($user['id'] != $id && ($user['username'] === $username || $user['email'] === $email)) {
            return false;
        }
    }
    
    // Update user
    foreach ($users as &$user) {
        if ($user['id'] == $id) {
            $user['username'] = $username;
            $user['email'] = $email;
            break;
        }
    }
    
    saveUsers($users);
    return true;
}

// Hapus user
function deleteUser($id) {
    $users = getAllUsers();
    $users = array_filter($users, function($user) use ($id) {
        return $user['id'] != $id;
    });
    saveUsers(array_values($users));
    return true;
}

// Get user by ID
function getUserById($id) {
    $users = getAllUsers();
    foreach ($users as $user) {
        if ($user['id'] == $id) {
            return $user;
        }
    }
    return null;
}
?>
