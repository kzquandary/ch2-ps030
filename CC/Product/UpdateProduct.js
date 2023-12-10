const { firestore } = require("../Firebase.js");

async function UpdateProduct(req, res) {
  try {
    // Dapatkan data dari body request
    const {
      product_id,
      active,
      product_category,
      product_description,
      product_name,
      product_price,
    } = req.body;

    // Validate required fields
    if (!product_id) {
      return res.status(400).json({ success: false, error: "Product ID is required." });
    }

    // Cari dokumen berdasarkan product_id
    const querySnapshot = await firestore
      .collection("product")
      .where("product_id", "==", product_id)
      .get();

    // Pastikan dokumen ditemukan sebelum diupdate
    if (querySnapshot.empty) {
      return res.status(404).json({ success: false, error: "Product not found." });
    }

    // Dokumen ditemukan, ambil referensi dokumen pertama
    const documentReference = querySnapshot.docs[0].ref;

    // Buat objek yang berisi data yang dapat diubah
    const updateData = {};
    if (active !== undefined) updateData.active = active;
    if (product_category) updateData.product_category = product_category;
    if (product_description) updateData.product_description = product_description;
    if (product_name) updateData.product_name = product_name;
    if (product_price) updateData.product_price = product_price;

    // Update data di Firestore
    await documentReference.update(updateData);

    return res.status(200).json({ success: true, message: "Product updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}

module.exports = {
  UpdateProduct,
};
