const { firestore } = require('../Firebase');
const jwt = require("jsonwebtoken");

// Get all Sellers

// get by Id
const GetSellers = async (req, res) => {
  try {
    // Mendapatkan token dari header Authorization
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      // Ekstrak token dari header Authorization
      const token = authorizationHeader.split(' ')[1];

      try {
        // Verifikasi token JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;

        // Mencari data penjual berdasarkan username
        const sellersSnapshot = await firestore.collection('sellers').where('username', '==', username).get();

        if (sellersSnapshot.empty) {
          return res.status(404).json({ success: false, message: 'Seller not found' });
        }

        // Ambil data penjual sesuai username dari token JWT
        const sellerData = sellersSnapshot.docs[0].data();

        // Extract hanya bidang yang diinginkan
        const filteredSellerData = {
          nama: sellerData.nama,
          owner: sellerData.owner,
          no_hp: sellerData.no_hp,
          email: sellerData.email,
          alamat: sellerData.alamat,
          current_location: sellerData.current_location,
          username: sellerData.username,
        };

        return res.status(200).json({ success: true, data: [filteredSellerData] });
      } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
    } else {
      // Jika tidak ada header Authorization, ambil semua data penjual (sellers)
      const sellersSnapshot = await firestore.collection('sellers').get();

      const sellersData = sellersSnapshot.docs.map(doc => {
        const sellerData = doc.data();
        return {
          nama: sellerData.nama,
          owner: sellerData.owner,
          no_hp: sellerData.no_hp,
          email: sellerData.email,
          alamat: sellerData.alamat,
          current_location: sellerData.current_location,
          username: sellerData.username,
        };
      });

      return res.status(200).json({ success: true, sellers: sellersData });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};


module.exports = {
  GetSellers,
};
