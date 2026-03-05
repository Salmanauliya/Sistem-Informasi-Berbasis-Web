document.addEventListener("DOMContentLoaded", function(){

const headerImages = document.getElementById("headerImages");
const tanggal = document.getElementById("tanggal");
const bulan = document.getElementById("bulan");
const tahun = document.getElementById("tahun");
const form = document.getElementById("formGarisHidup");
const btnReset = document.getElementById("btnReset");

const outTgl = document.getElementById("outTgl");
const outBln = document.getElementById("outBln");
const outThn = document.getElementById("outThn");
const outH1 = document.getElementById("outH1");
const outH2 = document.getElementById("outH2");
const outFinal = document.getElementById("outFinal");
const hasilPanjang = document.getElementById("hasilPanjang");

/* HEADER IMAGE */
for(let i=0;i<6;i++){
    const img = document.createElement("img");
    img.src = "assets/gedung itenas.webp";
    headerImages.appendChild(img);
}

/* TANGGAL KOSONG DULU */
tanggal.innerHTML = '<option value=""></option>';
for(let i=1;i<=31;i++){
    tanggal.innerHTML += `<option value="${i}">${i}</option>`;
}

/* TAHUN KOSONG DULU */
tahun.innerHTML = '<option value=""></option>';
for(let i=2000;i<=2026;i++){
    tahun.innerHTML += `<option value="${i}">${i}</option>`;
}

const pesanKepribadian = {
1: `Garis Hidup 1: Anda adalah sosok pemimpin alami yang memiliki kemandirian tinggi dan kepercayaan diri yang kuat. Orang dengan garis hidup ini biasanya memiliki visi yang jelas dan keberanian untuk mengambil keputusan penting. Anda tidak takut menghadapi tantangan dan sering menjadi orang pertama yang berinisiatif dalam berbagai situasi. Energi kepemimpinan yang Anda miliki mampu menginspirasi orang lain untuk bergerak maju dan mencapai tujuan bersama.

Selain itu, Anda memiliki kemampuan inovatif dan kreatif dalam menemukan solusi baru terhadap berbagai masalah. Banyak orang dengan garis hidup 1 yang sukses karena mereka berani mengambil langkah yang berbeda dari orang lain. Anda juga dikenal memiliki tekad yang kuat dan tidak mudah menyerah ketika menghadapi hambatan dalam hidup.

Namun demikian, Anda perlu berhati-hati agar tidak menjadi terlalu dominan atau keras kepala dalam memimpin. Terkadang sikap percaya diri yang terlalu tinggi dapat membuat Anda terlihat egois atau kurang memperhatikan pendapat orang lain. Dengan belajar menghargai kerja sama dan mendengarkan masukan dari orang lain, Anda akan menjadi pemimpin yang lebih bijaksana.`,

2: `Garis Hidup 2: Anda dikenal sebagai pribadi yang penuh kepekaan, empati, dan kemampuan bekerja sama yang baik. Orang dengan garis hidup ini biasanya memiliki sifat diplomatis dan mampu menjaga keseimbangan dalam hubungan sosial. Anda pandai memahami perasaan orang lain sehingga sering menjadi tempat curhat atau penengah dalam konflik.

Dalam kehidupan sehari-hari, Anda cenderung menghargai keharmonisan dan kedamaian. Anda tidak suka pertengkaran dan lebih memilih menyelesaikan masalah dengan cara yang tenang dan bijaksana. Kemampuan Anda dalam membangun hubungan yang hangat membuat banyak orang merasa nyaman berada di sekitar Anda.

Walaupun demikian, Anda perlu berhati-hati agar tidak terlalu sensitif terhadap perkataan atau sikap orang lain. Terkadang keraguan dalam mengambil keputusan dapat menghambat potensi besar yang Anda miliki. Dengan meningkatkan rasa percaya diri dan keberanian, Anda dapat mencapai keseimbangan yang lebih baik dalam hidup.`,

3: `Garis Hidup 3: Bagi mereka yang memiliki angka garis hidup 3, ekspresi diri, kreativitas, dan kemampuan bersosialisasi menjadi pelajaran penting dalam perjalanan hidupnya. Orang dengan angka ini sering dikenal sebagai pribadi yang optimis, penuh semangat, dan memiliki daya tarik sosial yang kuat. Mereka biasanya memiliki bakat dalam bidang seni, komunikasi, atau hiburan seperti menulis, berbicara di depan umum, akting, maupun bidang kreatif lainnya.

Orang dengan garis hidup 3 cenderung membawa energi positif ke dalam lingkungan sekitarnya. Mereka mudah bergaul, ramah, dan mampu membuat orang lain merasa diterima. Imajinasi kreatif mereka sangat besar dan jika dikembangkan dengan baik dapat menghasilkan karya yang luar biasa. Kehidupan bagi mereka adalah kesempatan untuk mengekspresikan diri dan berbagi kebahagiaan dengan orang lain.

Namun, sisi negatif yang perlu diwaspadai adalah kecenderungan untuk terlalu santai atau kurang fokus terhadap tujuan jangka panjang. Terkadang kemampuan yang dimiliki tersebar ke banyak hal sehingga sulit mencapai satu pencapaian besar. Dengan disiplin dan komitmen yang lebih kuat, potensi kreatif Anda dapat berkembang secara maksimal.`,

4: `Garis Hidup 4: Anda adalah sosok pekerja keras yang memiliki kedisiplinan dan tanggung jawab yang tinggi. Orang dengan garis hidup ini biasanya sangat terorganisir dan mampu membangun sesuatu secara bertahap dengan fondasi yang kuat. Anda percaya bahwa kesuksesan tidak datang secara instan, tetapi melalui usaha yang konsisten dan kerja keras.

Dalam kehidupan sehari-hari, Anda dikenal sebagai pribadi yang dapat diandalkan. Banyak orang mempercayai Anda karena sifat jujur dan komitmen yang kuat terhadap tugas. Anda juga memiliki kemampuan untuk merencanakan sesuatu secara matang sehingga pekerjaan dapat diselesaikan dengan baik.

Namun, terkadang sifat disiplin yang terlalu kuat dapat membuat Anda terlihat kaku atau kurang fleksibel terhadap perubahan. Penting bagi Anda untuk belajar lebih terbuka terhadap ide baru dan tidak terlalu keras terhadap diri sendiri maupun orang lain.`,

5: `Garis Hidup 5: Anda adalah pribadi yang menyukai kebebasan, petualangan, dan perubahan dalam hidup. Orang dengan garis hidup ini biasanya memiliki energi yang besar dan rasa ingin tahu yang tinggi terhadap dunia di sekitarnya. Anda mudah beradaptasi dengan lingkungan baru dan sering tertarik mencoba berbagai pengalaman berbeda.

Sifat dinamis membuat Anda mampu melihat peluang di berbagai situasi. Banyak orang dengan garis hidup 5 yang sukses dalam bidang yang membutuhkan kreativitas, komunikasi, dan mobilitas tinggi. Anda tidak suka rutinitas yang monoton dan selalu mencari cara untuk membuat hidup lebih menarik.

Namun, kecenderungan untuk selalu mencari hal baru kadang membuat Anda sulit untuk konsisten dalam satu tujuan. Penting bagi Anda untuk belajar menyeimbangkan antara kebebasan dan tanggung jawab agar potensi besar yang Anda miliki dapat berkembang secara optimal.`,

6: `Garis Hidup 6: Anda dikenal sebagai pribadi yang penuh kasih sayang, peduli terhadap orang lain, dan memiliki rasa tanggung jawab yang besar terhadap keluarga maupun lingkungan sekitar. Orang dengan garis hidup ini sering menjadi sosok pelindung atau pengasuh yang selalu siap membantu ketika orang lain membutuhkan.

Anda memiliki kemampuan alami untuk menciptakan keharmonisan dalam hubungan. Banyak orang merasa aman dan nyaman berada di dekat Anda karena sifat empati dan perhatian yang tulus. Kehidupan keluarga biasanya menjadi prioritas utama bagi Anda.

Namun, penting bagi Anda untuk menjaga keseimbangan antara membantu orang lain dan menjaga diri sendiri. Terkadang Anda bisa terlalu terlibat dalam masalah orang lain sehingga melupakan kebutuhan pribadi. Dengan menjaga batas yang sehat, Anda dapat tetap menjadi pribadi yang penuh kasih tanpa kehilangan keseimbangan hidup.`,

7: `Garis Hidup 7: Anda adalah pencari kebenaran yang memiliki sifat analitis dan pemikiran yang mendalam. Orang dengan garis hidup ini biasanya memiliki ketertarikan pada ilmu pengetahuan, filsafat, atau hal-hal yang bersifat spiritual. Anda senang mempelajari sesuatu secara mendalam dan tidak puas dengan jawaban yang dangkal.

Dalam kehidupan sehari-hari, Anda cenderung membutuhkan waktu untuk menyendiri guna merenung dan memahami berbagai hal secara lebih mendalam. Proses refleksi ini membantu Anda menemukan makna dalam setiap pengalaman hidup. Anda memiliki intuisi yang kuat serta kemampuan berpikir kritis yang baik.

Namun, terlalu banyak menyendiri atau terlalu curiga terhadap orang lain dapat membuat Anda merasa terisolasi. Penting bagi Anda untuk tetap membuka diri terhadap hubungan sosial agar keseimbangan antara kehidupan intelektual dan emosional tetap terjaga.`,

8: `Garis Hidup 8: Anda memiliki jiwa kepemimpinan yang kuat terutama dalam hal manajemen, bisnis, dan pencapaian materi. Orang dengan garis hidup ini biasanya memiliki ambisi besar untuk mencapai kesuksesan dan stabilitas dalam hidup. Anda pandai mengatur strategi serta memiliki kemampuan dalam mengelola sumber daya dengan efektif.

Banyak orang dengan garis hidup 8 yang berhasil dalam dunia usaha atau posisi kepemimpinan karena mereka mampu mengambil keputusan penting dengan cepat dan tegas. Anda juga memiliki ketekunan yang tinggi dalam mencapai target yang telah ditentukan.

Namun, fokus yang terlalu besar pada kekuasaan atau materi dapat membuat Anda kehilangan keseimbangan dalam hidup. Penting bagi Anda untuk tetap memperhatikan nilai-nilai kemanusiaan, hubungan sosial, dan kebahagiaan pribadi agar kesuksesan yang dicapai terasa lebih bermakna.`,

9: `Garis Hidup 9: Anda adalah pribadi yang memiliki jiwa kemanusiaan yang tinggi serta kepedulian yang besar terhadap dunia di sekitar Anda. Orang dengan garis hidup ini sering memiliki keinginan untuk membantu sesama dan menciptakan perubahan positif dalam masyarakat. Anda memiliki rasa empati yang kuat terhadap penderitaan orang lain.

Banyak orang dengan angka ini tertarik pada kegiatan sosial, pendidikan, atau bidang yang berkaitan dengan kemanusiaan. Anda memiliki kemampuan untuk melihat gambaran besar dalam kehidupan dan memahami bahwa setiap orang memiliki peran dalam menciptakan dunia yang lebih baik.

Namun, terkadang keinginan untuk membantu orang lain dapat membuat Anda terlalu mengorbankan diri sendiri. Penting bagi Anda untuk menjaga keseimbangan antara membantu orang lain dan memperhatikan kebutuhan pribadi agar energi dan semangat Anda tetap terjaga.`

};

form.addEventListener("submit", function(e){

    e.preventDefault();

    let tgl = tanggal.value;
    let bln = bulan.value;
    let thn = tahun.value;

    if(tgl==="" || bln==="" || thn===""){
        alert("Harap isi semua data!");
        return;
    }

    let gabungan = tgl + bln + thn;

    let total = gabungan.split('')
        .reduce((a,b)=>a+parseInt(b),0);

    let hasil1 = total;

    while(total > 9){
        total = total.toString()
        .split('')
        .reduce((a,b)=>a+parseInt(b),0);
    }

    outTgl.value = tgl;
    outBln.value = bln;
    outThn.value = thn;
    outH1.value = hasil1;
    outH2.value = "-";
    outFinal.value = total;

    hasilPanjang.innerHTML = `
        <h2>Tanggal Lahir Anda Berada Pada Garis Hidup ${total}</h2>
        <p>${pesanKepribadian[total]}</p>
    `;
});

btnReset.addEventListener("click", function(){
    outTgl.value="";
    outBln.value="";
    outThn.value="";
    outH1.value="";
    outH2.value="";
    outFinal.value="";
    hasilPanjang.innerHTML="";
});

});