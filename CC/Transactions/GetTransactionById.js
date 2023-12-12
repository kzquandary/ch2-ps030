const { firestore } = require('../Firebase');
const jwt = require('jsonwebtoken');

async function GetTransactionById(req, res) {
    try {
        const transactionId = req.params.id;

        // Get reference to the transaction collection
        const transactionRef = firestore.collection('transaction');

        // Retrieve the document by transaction ID
        const transactionQuery = await transactionRef.where('transaction_id', '==', transactionId).get();

        if (transactionQuery.empty) {
            res.status(404).json({ success: false, message: 'Transaction not found for the specified ID.' });
        } else {
            // Assuming transaction_id is unique, there should be only one document in the result set
            const transactionDoc = transactionQuery.docs[0];
            const transactionData = transactionDoc.data();

            // Map the transaction data
            const transaction = {
                transaction_id: transactionData.transaction_id,
                sellers: transactionData.sellers,
                items: transactionData.items,
                total_price: transactionData.total,
                alamat: transactionData.alamat,
                notes: transactionData.note,
                status: transactionData.status,
            };

            res.status(200).json({ success: true, data: transaction });
        }
    } catch (error) {
        console.error('Error getting transaction by ID:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetTransactionById,
};
