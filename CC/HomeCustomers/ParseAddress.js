const { firestore } = require('../Firebase');
const NodeGeocoder = require("node-geocoder");

// Konfigurasi untuk Google Maps Geocoding API
const options = {
  provider: "google",
  apiKey: process.env.MAPS_API_KEY, // Ganti dengan API key Anda
};

const geocoder = NodeGeocoder(options);

async function ParseAddress(req, res){
    const { address } = req.body;

    try {
        // Melakukan geocoding menggunakan alamat yang diberikan
        const result = await geocoder.geocode(address);

        if (result.length > 0) {
            // Mengambil data yang diinginkan dari hasil geocoding
            const parsedData = {
                city: parseCityName(result[0]),
            };

            // Mengirimkan data yang sudah di-parse sebagai respons
            res.status(200).json(parsedData);
        } else {
            res.status(404).json({ error: 'Alamat tidak ditemukan.' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mengolah alamat.' });
    }
}

function parseCityName(result) {
    // Mengambil nama kota dari hasil geocoding dan menghapus kata "Regency" dan "Kota"
    let city = result.city || result.locality || result.administrativeLevels.level2long;
    city = city.replace(/Kota|Regency/gi, "").trim();
    return city;
}

module.exports = {
    ParseAddress,
};
