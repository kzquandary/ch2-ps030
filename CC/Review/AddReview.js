const { firestore } = require('../Firebase');
const jwt = require('jsonwebtoken');

async function AddReview(req, res) {
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

            // Extract payload from request body
            const { transaction_id, review_description, sellers } = req.body;

            // Ensure required fields are provided
            if (!transaction_id || !review_description || !sellers) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            // Get reference to the reviews collection
            const reviewsRef = firestore.collection('review');

            // Add review to the collection
            await reviewsRef.add({
                transaction_id,
                customers,
                review_description,
                sellers,
                sentimen: 'positive',
            });

            res.status(201).json({ success: true, message: 'Review added successfully' });
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    AddReview,
};
