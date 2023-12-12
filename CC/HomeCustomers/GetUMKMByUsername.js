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
      const umkmList = sellersSnapshot.docs.map((doc) => {
        const seller = doc.data();
        return {
          nama: seller.nama,
          no_hp: seller.no_hp,
          current_location: seller.current_location,
          alamat: seller.alamat,
          owner: seller.owner,
          username: seller.username,
        };
      });

      res.status(200).json({ success: true, data: umkmList });
    }
  } catch (error) {
    console.error("Error processing username:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  GetUMKMByUsername,
};
