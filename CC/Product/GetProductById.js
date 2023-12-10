const { firestore } = require("../Firebase.js");

async function GetProductById(req, res) {
  try {
    // Get seller's username from the request parameters
    const productId = req.params.id;
    
    // Validate seller's username
    if (!productId) {
      return res.status(400).json({ success: false, error: "Seller's username is required." });
    }

    // Retrieve products by seller from Firestore
    const productsSnapshot = await firestore.collection("product")
      .where("product_id", "==", productId)
      .get();

    // Check if there are products for the seller
    if (productsSnapshot.empty) {
      return res.status(404).json({ success: false, error: "No products found for the seller." });
    }

    // Extract product data
    const productsData = [];
    productsSnapshot.forEach((doc) => {
      const productData = doc.data();
      productsData.push(productData);
    });

    return res.status(200).json({ success: true, data: productsData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}

module.exports = {
  GetProductById,
};
