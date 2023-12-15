const { firestore } = require('../Firebase');
const jwt = require("jsonwebtoken");

const GetCustomer = async (req, res) => {
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
        const customersSnapshot = await firestore.collection('customers').where('username', '==', username).get();

        if (customersSnapshot.empty) {
          return res.status(404).json({ success: false, message: 'customer not found' });
        }

        // Ambil data penjual sesuai username dari token JWT
        const customerData = customersSnapshot.docs[0].data();

        // Extract hanya bidang yang diinginkan
        const filteredcustomerData = {
          nama: customerData.nama,
          owner: customerData.owner,
          no_hp: customerData.no_hp,
          email: customerData.email,
          alamat: customerData.alamat,
          current_location: customerData.current_location,
          username: customerData.username,
        };

        return res.status(200).json({ success: true, data: [filteredcustomerData] });
      } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
    } else {
      // Jika tidak ada header Authorization, ambil semua data penjual (customers)
      const customersSnapshot = await firestore.collection('customers').get();

      const customersData = customersSnapshot.docs.map(doc => {
        const customerData = doc.data();
        return {
          nama: customerData.nama,
          no_hp: customerData.no_hp,
          email: customerData.email,
          alamat: customerData.alamat,
          current_location: customerData.current_location,
          username: customerData.username,
        };
      });

      return res.status(200).json({ success: true, customers: customersData });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  GetCustomer,
};
