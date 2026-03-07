// Menambahkan pemanggilan showHome() pada load agar tampilan awal benar
window.onload = function() {
    showHome();
};

// ===== MENU MAKANAN =====

function hitungTotal(){

let bakso = parseInt(document.getElementById("bakso").value) || 0;
let soto = parseInt(document.getElementById("soto").value) || 0;
let mie = parseInt(document.getElementById("mie").value) || 0;

let total = (bakso*12000) + (soto*10000) + (mie*15000);

let diskon = 0;

if(total > 50000){
diskon = total * 0.10;
}

let bayar = total - diskon;

document.getElementById("total").value = total;
document.getElementById("diskon").value = diskon;
document.getElementById("bayar").value = bayar;

}

function resetMenu(){

document.getElementById("bakso").value = 0;
document.getElementById("soto").value = 0;
document.getElementById("mie").value = 0;

document.getElementById("total").value = 0;
document.getElementById("diskon").value = 0;
document.getElementById("bayar").value = 0;

}


// ===== NAVIGASI =====

function showHome(){
document.getElementById("homePage").style.display = "flex";
document.getElementById("menuPage").style.display = "none";
document.getElementById("calcPage").style.display = "none";
}

function showMenu(){
// Menambahkan alert sesuai pdf saat menu "Menu" di klik
alert("input Jumlah Pesanan agar di hitung otomatis oleh sistem");

document.getElementById("homePage").style.display = "none";
document.getElementById("menuPage").style.display = "flex";
document.getElementById("calcPage").style.display = "none";
}

function showCalculator(){
document.getElementById("homePage").style.display = "none";
document.getElementById("menuPage").style.display = "none";
document.getElementById("calcPage").style.display = "block";
}


// ===== KALKULATOR =====

function hitungCalc(){

let a = document.getElementById("a").value;
let b = document.getElementById("b").value;

let op = document.getElementById("operator").value;

// Menyesuaikan alert jika input kosong atau kurang dari/sama dengan 0
if(a === "" || b === "" || parseFloat(a) <= 0 || parseFloat(b) <= 0){
alert("Inputan pertama dan kedua harus lebih dari 0");
return;
}

a = parseFloat(a);
b = parseFloat(b);

let hasil=0;

switch(op){

case "+":
hasil = a+b;
break;

case "-":
hasil = a-b;
break;

case "*":
hasil = a*b;
break;

case "/":
hasil = a/b;
break;

case "%":
hasil = a%b;
break;

case "^":
hasil = Math.pow(a,b);
break;

}

document.getElementById("hasil").value = hasil;

}

function resetCalc(){

document.getElementById("a").value="";
document.getElementById("b").value="";
document.getElementById("hasil").value="";

}

// ===== SHOUT =====
function shout() {
    // Disesuaikan huruf kapitalnya dengan yang ada di pdf
    alert("Hai, Selamat datang di Sistem Sederhana");
}