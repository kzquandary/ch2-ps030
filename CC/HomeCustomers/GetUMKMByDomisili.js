const { firestore } = require("../Firebase");
const NodeGeocoder = require("node-geocoder");
const jwt = require("jsonwebtoken");

// Konfigurasi untuk Google Maps Geocoding API
const options = {
  provider: "google",
  apiKey: process.env.MAPS_API_KEY, // Ganti dengan API key Anda
};

const geocoder = NodeGeocoder(options);

async function GetUMKMByDomisili(req, res) {
  try {
    // Mendapatkan token dari header Authorization
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Ekstrak token dari header Authorization
    const token = authorizationHeader.split(" ")[1];

    try {
      // Verifikasi token JWT
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const alamat = decodedToken.alamat;
      // Melakukan geocoding menggunakan alamat yang diberikan
      const result = await geocoder.geocode(alamat);

      if (result.length > 0) {
        // Mengambil data yang diinginkan dari hasil geocoding
        const parsedData = {
          city: parseCityName(result[0]),
        };

        // Get UMKM by Domisili
        const Domisili = parsedData.city.toLowerCase(); // Ubah ke huruf kecil

        // Mendapatkan semua dokumen dari koleksi 'sellers'
        const sellersSnapshot = await firestore.collection("sellers").get();

        // Melihat seluruh data seller
        const allSellers = sellersSnapshot.docs.map((doc) => doc.data());

        // Membuat regex dari nama kota yang diberikan
        const regex = new RegExp(`\\b${Domisili}\\b`, "i");

        // Melakukan pengecekan apakah alamat Sellers mengandung nama kota yang diberikan menggunakan regex
        const Sellers = allSellers
          .filter((seller) => regex.test(seller.alamat.toLowerCase()))
          .map((seller) => ({
            nama: seller.nama,
            no_hp: seller.no_hp,
            current_location: seller.current_location,
            alamat: seller.alamat,
            owner: seller.owner,
            username: seller.username,
          }));

        res.status(200).json({ success: true, data: Sellers });
      } else {
        res.status(404).json({ error: "Alamat tidak ditemukan." });
      }
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error processing domisili:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

function parseCityName(result) {
  // Mengambil nama kota dari hasil geocoding dan menghapus kata "Regency" dan "Kota"
  let city =
    result.city || result.locality || result.administrativeLevels.level2long;
  city = city.replace(/Kota|Regency/gi, "").trim();
  return city;
}

module.exports = {
  GetUMKMByDomisili,
};
