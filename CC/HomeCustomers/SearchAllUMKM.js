const { firestore } = require('../Firebase');

const SearchAllUMKM = async (req, res) => {
  try {
    // Jika tidak ada header Authorization, ambil semua data penjual (sellers)
    const sellersSnapshot = await firestore.collection('sellers').get();

    const sellersData = sellersSnapshot.docs.map(doc => {
      const sellerData = doc.data();
      const profile_image = sellerData.profile_image ?? null; // Use null if not assigned

      return {
        nama: sellerData.nama,
        no_hp: sellerData.no_hp,
        email: sellerData.email,
        owner: sellerData.owner,
        alamat: sellerData.alamat,
        current_location: sellerData.current_location,
        username: sellerData.username,
        profile_image, // Include profile_image in the response
      };
    });

    return res.status(200).json({ success: true, sellers: sellersData });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  SearchAllUMKM,
};
