const { firestore } = require('../Firebase');
const jwt = require("jsonwebtoken");

async function GetUMKMTransaction(req, res) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Extract token from header Authorization
        const token = authorization.split(' ')[1];

        try {
            // Verify JWT token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Get seller information from the token
            const sellers = decodedToken.username;

            // Get reference to the transaction collection
            const transactionRef = firestore.collection('transaction');

            // Query transactions for the specific seller
            const query = transactionRef.where('sellers', '==', sellers);
            const querySnapshot = await query.get();

            // If no transactions found
            if (querySnapshot.empty) {
                return res.status(404).json({ success: false, message: 'No transactions found for the specified seller.' });
            }

            // Map the transactions data
            const transactions = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    transaction_id: data.transaction_id,
                    sellers: data.sellers,
                    items: data.items,
                    total_price: data.total,
                    alamat: data.alamat,
                    notes: data.note,
                    status: data.status,
                };
            });

            res.status(200).json({ success: true, data: transactions });
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error getting transactions:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetUMKMTransaction,
};
