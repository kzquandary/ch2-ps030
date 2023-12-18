const { firestore } = require('../Firebase');

async function SearchUMKM(req, res) {
    try {
        const { nama } = req.params;

        // Check if UMKM name is present
        if (!nama) {
            return res.status(400).json({ success: false, error: 'UMKM name is required as a route parameter.' });
        }

        // Get reference to the sellers collection
        const sellersRef = firestore.collection('sellers');

        // Create a case-insensitive regex pattern
        const regexPattern = new RegExp(nama, 'i');

        // Query sellers based on the regex pattern
        const querySnapshot = await sellersRef.where('nama', '>=', '').where('nama', '<=', '\uf8ff').get();

        // Filter documents based on the regex pattern
        const matchingDocs = querySnapshot.docs.filter(doc => regexPattern.test(doc.data().nama));

        if (matchingDocs.length === 0) {
            res.status(404).json({ success: false, message: 'No UMKM found for the specified name.' });
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
                    image_url: seller.image_url || null,
                };
            });

            res.status(200).json({ success: true, data: umkmList });
        }
    } catch (error) {
        console.error('Error searching UMKM:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
}

module.exports = {
    SearchUMKM,
};
