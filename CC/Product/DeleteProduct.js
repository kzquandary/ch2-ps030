const { firestore, bucket } = require("../Firebase.js");

// Fungsi untuk menghapus data product
async function DeleteProduct(req, res) {
  try {
    // Dapatkan product_id dari request parameters
    const { product_id } = req.params;

    // Validasi product_id
    if (!product_id) {
      return res.status(400).json({ success: false, error: "Product ID is required." });
    }

    // Cari dokumen berdasarkan product_id
    const querySnapshot = await firestore
      .collection("product")
      .where("product_id", "==", product_id)
      .get();

    // Pastikan ada dokumen yang cocok
    if (querySnapshot.empty) {
      return res.status(404).json({ success: false, error: "Product not found." });
    }

    // Hapus gambar dari penyimpanan bucket
    const imageFileName = `${product_id}.jpg`;
    const imageFile = bucket.file(imageFileName);

    await imageFile.delete();

    // Hapus data product dari Firestore berdasarkan product_id
    const docRef = querySnapshot.docs[0].ref;
    await docRef.delete();

    return res.status(200).json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}

module.exports = {
  DeleteProduct,
};
