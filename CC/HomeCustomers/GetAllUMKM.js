const { firestore } = require('../Firebase');

const GetSeller = async (req, res) => {
  try {
    // Jika tidak ada header Authorization, ambil semua data penjual (sellers)
    const sellersSnapshot = await firestore.collection('sellers').get();

    const sellersData = sellersSnapshot.docs.map(doc => {
      const sellerData = doc.data();
      return {
        nama: sellerData.nama,
        no_hp: sellerData.no_hp,
        email: sellerData.email,
        email: sellerData.owner,
        alamat: sellerData.alamat,
        current_location: sellerData.current_location,
        username: sellerData.username,
      };
    });

    return res.status(200).json({ success: true, sellers: sellersData });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  GetSeller,
};
