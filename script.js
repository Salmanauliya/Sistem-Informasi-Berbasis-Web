// Validasi form create
function validateCreateForm(username, email) {
    let errors = [];
    
    if (username.trim() === '') {
        errors.push('Username tidak boleh kosong');
    }
    
    if (email.trim() === '') {
        errors.push('Email tidak boleh kosong');
    } else if (!isValidEmail(email)) {
        errors.push('Format email tidak valid');
    }
    
    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
}

// Fungsi untuk menampilkan notifikasi client-side
function showClientNotification(message, type) {
    // Cek apakah sudah ada toast, jika ada hapus
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast) toast.classList.remove('show');
        setTimeout(() => {
            if (toast) toast.remove();
        }, 300);
    }, 3000);
}

// Konfirmasi delete dengan modal
window.confirmDelete = function(id, username) {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        document.getElementById('deleteUsername').innerText = username;
        document.getElementById('deleteLink').href = 'delete.php?id=' + id;
        modal.style.display = 'flex';
    }
}

window.closeModal = function() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.closeToast = function() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast) toast.remove();
        }, 300);
    }
}

// Auto close toast on load jika ada
document.addEventListener('DOMContentLoaded', function() {
    const toast = document.getElementById('toast');
    if (toast) {
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Tutup modal jika klik di luar
    const modal = document.getElementById('deleteModal');
    if (modal) {
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }
});