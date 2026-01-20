// === KONFIGURASI UI ===
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatBox = document.getElementById('chat-box');
const chatCloseBtn = document.getElementById('chat-close-btn');
const sendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

// Toggle Chat (Buka/Tutup)
chatToggleBtn.addEventListener('click', () => {
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'flex';
        document.getElementById('chat-input').focus();
    } else {
        chatBox.style.display = 'none';
    }
});

chatCloseBtn.addEventListener('click', () => {
    chatBox.style.display = 'none';
});

// === LOGIKA PENGIRIMAN PESAN ===
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Fungsi dipanggil dari tombol opsi cepat (Quick Options)
function sendQuickMessage(text) {
    addMessage(text, 'user-message');
    showTypingEffectAndReply(text);
}

// Fungsi kirim pesan manual
function sendMessage() {
    const text = chatInput.value.trim();
    if (text !== "") {
        addMessage(text, 'user-message');
        chatInput.value = '';
        showTypingEffectAndReply(text);
    }
}

// Menambahkan pesan ke layar
function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerHTML = text; // Menggunakan innerHTML agar bisa render tag <b>, <br>, <ul>
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Efek "Sedang mengetik..." sebelum bot menjawab
function showTypingEffectAndReply(userText) {
    // Buat elemen indikator mengetik
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    typingDiv.id = 'typing-indicator';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Delay random antara 0.8 - 1.5 detik agar terasa natural
    const delay = Math.floor(Math.random() * 700) + 800;

    setTimeout(() => {
        // Hapus indikator typing
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
        
        // Generate dan tampilkan jawaban
        const reply = generateBotResponse(userText);
        addMessage(reply, 'bot-message');
    }, delay);
}

// === OTAK CERDAS CHATBOT (DATABASE PENGETAHUAN LENGKAP) ===
function generateBotResponse(input) {
    const text = input.toLowerCase();

    // 1. TOPIK: JAM BUKA / HARI (LOGIKA BUKA SETIAP HARI)
    if (text.match(/jam|buka|tutup|hari|minggu|libur|operasional|waktu/)) {
        return `
            <b>🕒 Jam Operasional SIMIG:</b><br>
            Kabar baik! Kami buka <b>SETIAP HARI</b> (Senin - Minggu).<br><br>
            ✅ <b>Senin - Minggu:</b> 08.00 - 17.00 WIB<br><br>
            Anda bisa mengirim atau menyetor barang kapan saja termasuk hari Minggu atau Tanggal Merah. Tim kami selalu standby di lokasi.
        `;
    }

    // 2. TOPIK: HARGA
    else if (text.match(/harga|bayar|rupiah|kilo|kg|uang|dapat berapa/)) {
        return `
            <b>Mengenai Harga Rosok:</b><br>
            Mohon maaf, harga rosok bersifat <b>fluktuatif</b> (berubah setiap hari mengikuti harga pasar pabrik & global).<br><br>
            Faktor penentu harga:
            <ul class="chat-list">
                <li><b>Jenis Material:</b> Tembaga tentu lebih mahal dari besi/plastik.</li>
                <li><b>Kondisi:</b> Barang bersih (tanpa kotoran/air) dihargai lebih tinggi.</li>
                <li><b>Volume:</b> Partai besar bisa mendapatkan harga spesial.</li>
            </ul>
            Untuk info harga <b>terupdate hari ini</b>, silakan klik tombol WA untuk chat admin langsung.
        `;
    }

    // 3. TOPIK: LAYANAN JEMPUT / LOKASI
    else if (text.match(/jemput|ambil|antar|lokasi|alamat|rumah|transport|google map/)) {
        return `
            <b>Layanan Penjemputan & Lokasi:</b><br>
            📍 <b>Lokasi Gudang:</b> RT. 03 RW. 01, Bangetayu Wetan, Genuk, Semarang.<br><br>
            🚚 <b>Syarat Penjemputan:</b><br>
            Kami menyediakan armada (Pickup/Truk) untuk menjemput barang ke lokasi Anda dengan minimal muatan <b>500kg - 1 Ton</b> (tergantung jarak).<br><br>
            Jika muatan sedikit, silakan diantar langsung ke gudang kami (Buka Setiap Hari) untuk ditimbang dan dibayar di tempat.
        `;
    }

    // 4. TOPIK: JENIS PLASTIK
    else if (text.match(/plastik|botol|ember|gelas|naso|pet|hdpe/)) {
        return `
            <b>Kategori Plastik:</b><br>
            Kami menerima hampir semua jenis plastik daur ulang:
            <ul class="chat-list">
                <li><b>PET:</b> Botol air mineral bening/biru (aqua, dll).</li>
                <li><b>PP (Gelas):</b> Gelas minuman, ember warna.</li>
                <li><b>HDPE:</b> Botol sampo, jerigen, tutup botol.</li>
                <li><b>LDPE:</b> Plastik bening/buram yang melar.</li>
            </ul>
            <i>Tips: Pisahkan tutup botol agar harga lebih tinggi!</i>
        `;
    }

    // 5. TOPIK: JENIS LOGAM
    else if (text.match(/logam|besi|tembaga|kuningan|aluminium|seng|kabel/)) {
        return `
            <b>Kategori Logam:</b><br>
            Jenis logam sangat bernilai tinggi. Kami menerima:
            <ul class="chat-list">
                <li><b>Besi:</b> Besi tua, rangka bangunan, potongan pipa, seng.</li>
                <li><b>Tembaga:</b> Kabel kupas/bakar, kawat dinamo (Grade A/B).</li>
                <li><b>Aluminium:</b> Kaleng minuman, wajan bekas, kusen, velg motor.</li>
                <li><b>Kuningan, Perunggu & Timah.</b></li>
            </ul>
        `;
    }

    // 6. TOPIK: JENIS KERTAS
    else if (text.match(/kertas|kardus|buku|koran|arsip|duplek|semen/)) {
        return `
            <b>Kategori Kertas:</b><br>
            Limbah kertas harus dalam kondisi kering (tidak basah/minyak).
            <ul class="chat-list">
                <li><b>Kardus/Box:</b> Gelondongan atau press.</li>
                <li><b>Kertas Putih (HVS):</b> Arsip kantor, buku tulis (SWL).</li>
                <li><b>Koran & Majalah/Buram.</b></li>
                <li><b>Sak Semen</b> (Kondisi bersih sisa semen).</li>
            </ul>
        `;
    }

    // 7. TOPIK: PEMBAYARAN
    else if (text.match(/transfer|cash|tunai|tempo|hutang/)) {
        return `
            <b>Sistem Pembayaran:</b><br>
            Di SIMIG, kami mengutamakan transaksi yang cepat dan transparan.<br>
            ✅ <b>Timbang Bayar:</b> Barang datang, ditimbang, langsung dibayar lunas (Cash atau Transfer) saat itu juga.<br>
            ❌ Kami tidak melayani sistem tempo/hutang.
        `;
    }

    // 8. TOPIK: KONTAK / WA
    else if (text.match(/wa|whatsapp|nomor|tlp|telepon|hubungi|admin/)) {
        return `
            Anda bisa menghubungi kami langsung via WhatsApp untuk kirim foto barang atau negosiasi harga di nomor:<br>
            📞 <b>+62 812-3456-7890</b><br><br>
            Atau klik menu 'Kontak Kami' di bagian atas website.
        `;
    }

    // 9. SAPAAN UMUM
    else if (text.match(/halo|hai|pagi|siang|sore|malam|assalam|tes|permisi/)) {
        return `Halo! Selamat datang di layanan otomatis SIMIG. 👋<br>Kami <b>Buka Setiap Hari</b>. Ada yang bisa dibantu seputar Lokasi, Jenis Rosok, atau Harga hari ini?`;
    }

    // 10. TERIMAKASIH (LOGIKA BARU)
    else if (text.match(/makasih|terima\s*kasih|thank|tq|suwun|maturnuwun/)) {
        return `
            <b>Sama-sama!</b> Senang bisa membantu Anda. 😊🙏<br><br>
            Jika ada rosok yang menumpuk, jangan ragu untuk hubungi kami lagi ya! Kami siap jemput atau terima di gudang.
        `;
    }

    // DEFAULT (Jika tidak mengerti)
    else {
        return `
            Maaf, saya bot otomatis dan belum mengerti pertanyaan spesifik tersebut. 🙏<br><br>
            Topik yang bisa saya jawab:
            <ul class="chat-list">
                <li><b>Jam Buka</b> (Info hari kerja)</li>
                <li><b>Lokasi & Jemput</b> (Syarat jemputan)</li>
                <li><b>Detail Barang</b> (Plastik, Logam, Kertas)</li>
                <li><b>Sistem Bayar</b></li>
            </ul>
            Untuk pertanyaan yang lebih rumit, silakan hubungi Admin via WhatsApp.
        `;
    }
}