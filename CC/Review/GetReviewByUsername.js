const { firestore } = require('../Firebase');
const jwt = require('jsonwebtoken');

async function GetReviewByUsername(req, res) {
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

            // Get customer information from the token
            const customers = decodedToken.username;

            // Get reference to the reviews collection
            const reviewsRef = firestore.collection('review');

            // Query reviews for the specific customer
            const query = reviewsRef.where('customers', '==', customers);
            const querySnapshot = await query.get();

            // If no reviews found
            if (querySnapshot.empty) {
                return res.status(404).json({ success: false, message: 'No reviews found for the specified customer.' });
            }

            // Map the reviews data
            const reviews = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    transaction_id: data.transaction_id,
                    review_description: data.review_description,
                    sellers: data.sellers,
                    sentimen: data.sentimen,
                    created_at: data.created_at,
                };
            });

            res.status(200).json({ success: true, data: reviews });
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetReviewByUsername,
};
