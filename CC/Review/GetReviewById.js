const { firestore } = require('../Firebase');

async function GetReviewById(req, res) {
    try {
        // Get review ID from request parameters
        const reviewId = req.params.id;

        // Ensure reviewId is provided
        if (!reviewId) {
            return res.status(400).json({ success: false, message: 'Missing review ID' });
        }

        // Get reference to the reviews collection
        const reviewsRef = firestore.collection('review');

        // Query reviews for the specific review ID
        const query = reviewsRef.where('transaction_id', '==', reviewId);
        const querySnapshot = await query.get();

        // If no reviews found
        if (querySnapshot.empty) {
            return res.status(404).json({ success: false, message: 'Review not found for the specified ID.' });
        }

        // Map the reviews data
        const reviews = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                transaction_id: data.transaction_id,
                review_description: data.review_description,
                sellers: data.sellers,
                created_at: data.created_at,
            };
        });

        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error('Error getting review by ID:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    GetReviewById,
};
