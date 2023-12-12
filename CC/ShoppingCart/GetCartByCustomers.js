const { firestore } = require('../Firebase');
const jwt = require('jsonwebtoken');

async function GetCartByCustomers(req, res) {
    try {
        // Mendapatkan token dari header Authorization
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Ekstrak token dari header Authorization
        const token = authorizationHeader.split(' ')[1];

        try {
            // Verifikasi token JWT
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            
            // Dapatkan informasi pelanggan dari token
            const customers = decodedToken.username;
            const alamat = decodedToken.alamat;
            // Get reference to the shopping_cart collection
            const shoppingCartRef = firestore.collection('shopping_cart');

            // Query to find all documents with given customer
            const query = shoppingCartRef.where('customers', '==', customers);

            // Execute the query
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                return res.status(404).json({ success: false, message: 'Shopping cart not found for the specified customer.' });
            } else {
                // Initialize an array to store cart data from all matching documents
                const cartsData = [];

                // Loop through all matching documents
                querySnapshot.forEach((doc) => {
                    const cartData = doc.data();
                    cartsData.push(cartData);
                });

                return res.status(200).json({ success: true, data: cartsData });
            }
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error getting products by customers:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetCartByCustomers,
};
