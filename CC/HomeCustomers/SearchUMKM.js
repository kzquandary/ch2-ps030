const { firestore } = require('../Firebase');

async function SearchUMKM(req, res) {
    try {
        const { keyword } = req.body;

        // Check if keyword is present
        if (!keyword) {
            return res.status(400).json({ success: false, error: 'Keyword is required in the request body.' });
        }

        // Get reference to the sellers collection
        const sellersRef = firestore.collection('sellers');

        // Create a case-insensitive regex pattern
        const regexPattern = new RegExp(keyword, 'i');

        // Query sellers based on the regex pattern
        const querySnapshot = await sellersRef.where('nama', '>=', '').where('nama', '<=', '\uf8ff').get();

        // Filter documents based on the regex pattern
        const matchingDocs = querySnapshot.docs.filter(doc => regexPattern.test(doc.data().nama));

        if (matchingDocs.length === 0) {
            res.status(404).json({ success: false, message: 'No UMKM found for the specified keyword.' });
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
