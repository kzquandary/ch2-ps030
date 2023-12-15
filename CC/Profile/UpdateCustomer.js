const { firestore } = require("../Firebase");
const jwt = require("jsonwebtoken");

async function UpdateProfile(req, res) {
  const { alamat, nama, no_tlp, email } = req.body;

  // Validate input
  if (!alamat && !nama && !no_tlp && !email) {
    return res
      .status(400)
      .json({ success: false, message: "Tidak ada data yang diperbarui" });
  }

  try {
    // Get the username from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Decode the JWT token to get the username
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username;

    // Check if the document exists before updating
    const customerRef = firestore.collection("customers");
    const query = customerRef.where("username", "==", username);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Update the user's profile in the customers collection
    const updatedData = {};
    if (alamat) updatedData.alamat = alamat;
    if (nama) updatedData.nama = nama;
    if (no_tlp) updatedData.no_tlp = no_tlp;
    if (email) updatedData.email = email;

    // Since the username is unique, there should be only one document in the result
    const customerDoc = querySnapshot.docs[0];
    await customerDoc.ref.update(updatedData);

    res
      .status(200)
      .json({ success: true, message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

module.exports = {
  UpdateProfile,
};
