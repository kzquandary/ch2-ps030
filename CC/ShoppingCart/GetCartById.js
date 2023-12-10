const { firestore } = require('../Firebase');

async function GetCartById(req, res) {
    try {
        const { id } = req.params;

        // Get reference to the shopping_cart collection
        const shoppingCartRef = firestore.collection('shopping_cart');

        // Retrieve the document by cart ID
        const cartQuery = await shoppingCartRef.where('cart_id', '==', id).get();

        if (cartQuery.empty) {
            res.status(404).json({ success: false, message: 'Shopping cart not found for the specified ID.' });
        } else {
            // Assuming cart_id is unique, there should be only one document in the result set
            const cartDoc = cartQuery.docs[0];
            const cartData = cartDoc.data();
            res.status(200).json({ success: true, data: cartData });
        }
    } catch (error) {
        console.error('Error getting shopping cart by ID:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetCartById,
};
