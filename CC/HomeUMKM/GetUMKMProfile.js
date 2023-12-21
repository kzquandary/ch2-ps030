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

        // Get reviews by username
        const reviewsSnapshot = await firestore
          .collection("review")
          .where("sellers", "==", username)
          .get();

          console.log(reviewsSnapshot);
        // Calculate sentiments
        let positiveSentiments = 0;
        let neutralSentiments = 0;
        let negativeSentiments = 0;

        reviewsSnapshot.forEach((reviewDoc) => {
          const review = reviewDoc.data();
          const sentiment = review.sentimen; // Use "sentiment" instead of "sentimen"
          console.log("Review Data:", review);

          if (sentiment === "positif") {
            positiveSentiments++;
          } else if (sentiment === "netral") {
            neutralSentiments++;
          } else if (sentiment === "negatif") {
            negativeSentiments++;
          }
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
          sentiments: {
            positive: positiveSentiments,
            neutral: neutralSentiments,
            negative: negativeSentiments,
          },
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

        // Get reviews by username
        const reviewsSnapshot = await firestore
          .collection("review")
          .where("seller_username", "==", sellerData.username)
          .get();

        // Calculate sentiments
        let positiveSentiments = 0;
        let neutralSentiments = 0;
        let negativeSentiments = 0;

        reviewsSnapshot.forEach((reviewDoc) => {
          const review = reviewDoc.data();
          const sentiment = review.sentiment;

          if (sentiment === "positive") {
            positiveSentiments++;
          } else if (sentiment === "neutral") {
            neutralSentiments++;
          } else if (sentiment === "negative") {
            negativeSentiments++;
          }
        });

        return {
          nama: sellerData.nama,
          no_hp: sellerData.no_hp,
          current_location: sellerData.current_location,
          alamat: sellerData.alamat,
          owner: sellerData.owner,
          username: sellerData.username,
          product_list: productList,
          sentiments: {
            positive: positiveSentiments,
            neutral: neutralSentiments,
            negative: negativeSentiments,
          },
        };
      });

      const umkmsWithProducts = await Promise.all(sellersData);

      return res
        .status(200)
        .json({ success: true, sellers: umkmsWithProducts });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  GetUMKMProfile,
};
