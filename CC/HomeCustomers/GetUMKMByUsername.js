const { firestore } = require("../Firebase");

async function GetUMKMByUsername(req, res) {
  try {
    const username = req.params.username;

    // Get UMKM by Username
    const sellersSnapshot = await firestore
      .collection("sellers")
      .where("username", "==", username)
      .get();

    if (sellersSnapshot.empty) {
      res.status(404).json({
        success: false,
        message: "UMKM not found for the specified username.",
      });
    } else {
      // Map the UMKM data
      const umkmList = sellersSnapshot.docs.map(async (doc) => {
        const seller = doc.data();

        // Get products by username
        const productsSnapshot = await firestore
          .collection("product")
          .where("username", "==", username)
          .get();

        // Map the product data
        const productList = productsSnapshot.docs.map((productDoc) => {
          const product = productDoc.data();
          return {
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_description: product.product_description,
            product_category: product.product_category,
            image_url: product.image_url,
            active: product.active,
            created_at: product.created_at,
            // Add other product fields as needed
          };
        });

        return {
          nama: seller.nama,
          no_hp: seller.no_hp,
          current_location: seller.current_location,
          alamat: seller.alamat,
          owner: seller.owner,
          username: seller.username,
          product_list: productList,
        };
      });

      const umkmsWithProducts = await Promise.all(umkmList);

      res.status(200).json({ success: true, data: umkmsWithProducts });
    }
  } catch (error) {
    console.error("Error processing username:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  GetUMKMByUsername,
};
