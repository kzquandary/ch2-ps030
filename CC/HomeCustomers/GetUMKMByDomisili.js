const { firestore } = require('../Firebase.js');

async function GetUMKMByDomisili(req, res) {
    const Domisili = req.params.domisili.toLowerCase(); // Ubah ke huruf kecil

    try {
        // Mendapatkan semua dokumen dari koleksi 'sellers'
        const sellersSnapshot = await firestore.collection('sellers').get();

        // Melihat seluruh data seller
        const allSellers = sellersSnapshot.docs.map(doc => doc.data());

        // Membuat regex dari nama kota yang diberikan
        const regex = new RegExp(`\\b${Domisili}\\b`, 'i');

        // Melakukan pengecekan apakah alamat Sellers mengandung nama kota yang diberikan menggunakan regex
        const Sellers = allSellers
            .filter(seller => regex.test(seller.alamat.toLowerCase()))
            .map(seller => ({
                nama: seller.nama,
                no_hp: seller.no_hp,
                current_location: seller.current_location,
                alamat: seller.alamat,
                owner: seller.owner,
                username: seller.username,
            }));

        res.status(200).json({ Sellers });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data.' });
    }
}

module.exports = {
    GetUMKMByDomisili,
};