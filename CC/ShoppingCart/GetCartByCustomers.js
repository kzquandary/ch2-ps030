const { firestore } = require('../Firebase');

async function GetCartByCustomers(req, res) {
    try {
        const { customers } = req.params;

        // Get reference to the shopping_cart collection
        const shoppingCartRef = firestore.collection('shopping_cart');

        // Query to find all documents with given customer
        const query = shoppingCartRef.where('customers', '==', customers);

        // Execute the query
        const querySnapshot = await query.get();

        if (querySnapshot.empty) {
            res.status(404).json({ success: false, message: 'Shopping cart not found for the specified customer.' });
        } else {
            // Initialize an array to store cart data from all matching documents
            const cartsData = [];

            // Loop through all matching documents
            querySnapshot.forEach((doc) => {
                const cartData = doc.data();
                cartsData.push(cartData);
            });

            res.status(200).json({ success: true, data: cartsData });
        }
    } catch (error) {
        console.error('Error getting products by customers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetCartByCustomers,
};
