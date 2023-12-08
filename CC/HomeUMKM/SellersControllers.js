const { firestore } = require('../Firebase');

// Get all Sellers
const getSellers = async (req, res) => {
  try {
    const sellers = await firestore.collection('sellers').get();
    const sellerData = sellers.docs.map((doc) => doc.data()); 

    res.status(200).json({ success: true, sellers: sellerData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// get by Id
const getSellerById = async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await firestore.collection('sellers').doc(sellerId).get(); 

    if (!seller.exists) {
      return res.status(404).json({ success: false, message: 'Seller not found' }); //ganti juga boleh
    }

    const sellerData = seller.data();

    res.status(200).json({ success: true, seller: sellerData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getSellers,
  getSellerById,
};
