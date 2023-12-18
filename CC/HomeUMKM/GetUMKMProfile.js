const { firestore } = require("../Firebase");
const jwt = require("jsonwebtoken");

const GetUMKMProfile = async (req, res) => {
  try {
    // Mendapatkan token dari header Authorization
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      // Ekstrak token dari header Authorization
      const token = authorizationHeader.split(" ")[1];

      try {
        // Verifikasi token JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;

        // Mencari data penjual berdasarkan username
        const sellersSnapshot = await firestore
          .collection("sellers")
          .where("username", "==", username)
          .get();

        if (sellersSnapshot.empty) {
          return res
            .status(404)
            .json({ success: false, message: "seller not found" });
        }

        // Ambil data penjual sesuai username dari token JWT
        const sellerData = sellersSnapshot.docs[0].data();

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

        // Extract hanya bidang yang diinginkan dari data penjual
        const filteredsellerData = {
          nama: sellerData.nama,
          owner: sellerData.owner,
          no_hp: sellerData.no_hp,
          email: sellerData.email,
          alamat: sellerData.alamat,
          current_location: sellerData.current_location,
          username: sellerData.username,
          product_list: productList,
        };

        return res
          .status(200)
          .json({ success: true, data: [filteredsellerData] });
      } catch (error) {
        console.error("Error verifying JWT:", error);
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
    } else {
      // Jika tidak ada header Authorization, ambil semua data penjual (sellers)
      const sellersSnapshot = await firestore.collection("sellers").get();

      const sellersData = sellersSnapshot.docs.map(async (doc) => {
        const sellerData = doc.data();

        // Get products by username
        const productsSnapshot = await firestore
          .collection("product")
          .where("username", "==", sellerData.username)
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
          nama: sellerData.nama,
          no_hp: sellerData.no_hp,
          current_location: sellerData.current_location,
          alamat: sellerData.alamat,
          owner: sellerData.owner,
          username: sellerData.username,
          product_list: productList,
        };
      });

      const umkmsWithProducts = await Promise.all(sellersData);

      return res.status(200).json({ success: true, sellers: umkmsWithProducts });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  GetUMKMProfile,
};
