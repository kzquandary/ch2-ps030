const { firestore } = require('../Firebase');
const { v4: uuidv4 } = require("uuid");

async function ShoppingCart(req, res) {
    try {
        const { type, sellers, customers, items } = req.body;

        // Get reference to the shopping_cart collection
        const shoppingCartRef = firestore.collection('shopping_cart');

        // Query to find the specific document with given customer and seller
        const query = shoppingCartRef
            .where('customers', '==', customers)
            .where('sellers', '==', sellers);

        // Execute the query
        const querySnapshot = await query.get();

        if (querySnapshot.empty) {
            // If no document found, create a new one
            const cart_id = uuidv4();
            const newCart = {
                customers: customers,
                sellers: sellers,
                items: [
                    {
                        product_id: items,
                        qty: 1,
                    },
                ],
                cart_id: cart_id,
            };

            await shoppingCartRef.add(newCart);
            res.status(201).json({ success: true, message: 'New shopping cart created.' });
        } else {
            // If document found, update the existing one
            const cartDoc = querySnapshot.docs[0];
            const cartData = cartDoc.data();
            const itemsArray = cartData.items;

            const existingItem = itemsArray.find(item => item.product_id === items);

            if (type === 'plus') {
                if (existingItem) {
                    // If product_id already exists, increment the quantity
                    existingItem.qty += 1;
                } else {
                    // If product_id does not exist, add a new item to the array
                    itemsArray.push({
                        product_id: items,
                        qty: 1,
                    });
                }
            } else if (type === 'minus') {
                if (existingItem) {
                    // If product_id exists, decrement the quantity
                    existingItem.qty -= 1;

                    // Remove the item if quantity becomes 0
                    if (existingItem.qty === 0) {
                        const index = itemsArray.indexOf(existingItem);
                        itemsArray.splice(index, 1);
                    }
                } else {
                    // Handle case where product_id doesn't exist (optional)
                    res.status(404).json({ success: false, message: 'Item not found in the shopping cart.' });
                    return;
                }
            }

            // Update the document in Firestore
            await cartDoc.ref.update({
                items: itemsArray,
            });

            res.status(200).json({ success: true, message: 'Shopping cart updated successfully.' });
        }
    } catch (error) {
        console.error('Error processing shopping cart:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    ShoppingCart,
};
