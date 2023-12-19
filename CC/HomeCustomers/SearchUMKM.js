const { firestore } = require('../Firebase');

async function SearchUMKM(req, res) {
    try {
        const { nama } = req.params;

        // Get reference to the sellers collection
        const sellersRef = firestore.collection('sellers');

        if (nama) {
            // Search for a specific UMKM if the 'nama' parameter is provided

            // Create a case-insensitive regex pattern
            const regexPattern = new RegExp(nama, 'i');

            // Query sellers based on the regex pattern
            const querySnapshot = await sellersRef.where('nama', '>=', '').where('nama', '<=', '\uf8ff').get();

            // Filter documents based on the regex pattern
            const matchingDocs = querySnapshot.docs.filter(doc => regexPattern.test(doc.data().nama));

            if (matchingDocs.length === 0) {
                res.status(404).json({ success: true, sellers: [], message: 'No UMKM found for the specified name.' });
            } else {
                // Map the UMKM data
                const umkmList = matchingDocs.map(doc => {
                    const seller = doc.data();
                    return {
                        nama: seller.nama,
                        no_hp: seller.no_hp,
                        current_location: seller.current_location,
                        alamat: seller.alamat,
                        owner: seller.owner,
                        username: seller.username,
                        profile_image: seller.profile_image || null,
                    };
                });

                res.status(200).json({ success: true, sellers: umkmList });
            }
        } else {
            // Retrieve all sellers if 'nama' parameter is not provided

            const allSellersSnapshot = await sellersRef.get();

            if (allSellersSnapshot.empty) {
                res.status(404).json({ success: true, sellers: [], message: 'No UMKM found.' });
            } else {
                const allSellersList = allSellersSnapshot.docs.map(doc => {
                    const seller = doc.data();
                    return {
                        nama: seller.nama,
                        no_hp: seller.no_hp,
                        current_location: seller.current_location,
                        alamat: seller.alamat,
                        owner: seller.owner,
                        username: seller.username,
                        profile_image: seller.profile_image || null,
                    };
                });

                res.status(200).json({ success: true, sellers: allSellersList });
            }
        }
    } catch (error) {
        console.error('Error searching UMKM:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}

module.exports = {
    SearchUMKM,
};
