const { firestore } = require('../Firebase');
const jwt = require("jsonwebtoken");

async function AddTransaction(req, res) {
    try {
        const authorizationHeader = req.headers.authorization;
        const { cart_id, sellers, items, total_price, alamat, notes } = req.body;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Extract token from header Authorization
        const token = authorizationHeader.split(' ')[1];

        try {
            // Verify JWT token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Get customer information from the token
            const customers = decodedToken.username;

            // Get reference to the transaction collection
            const transactionRef = firestore.collection('transaction');

            // Generate transaction_id from cart_id
            const transaction_id = cart_id;

            // Create new transaction object
            const newTransaction = {
                customers,
                sellers,
                items,
                total: total_price,
                alamat,
                note: notes,
                status: 'Pending', // You can set the initial status as needed
                transaction_id,
            };

            // Add the transaction to the transaction collection
            await transactionRef.add(newTransaction);

            // Get reference to the shopping_cart collection
            const shoppingCartRef = firestore.collection('shopping_cart');

            // Delete the shopping cart with the given cart_id
            const cartQuery = await shoppingCartRef.where('cart_id', '==', cart_id).get();
            if (!cartQuery.empty) {
                const cartDoc = cartQuery.docs[0];
                await cartDoc.ref.delete();
            }

            res.status(201).json({ success: true, message: 'Transaction added successfully.' });
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    AddTransaction,
};
