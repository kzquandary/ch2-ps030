const { firestore } = require('../Firebase');
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');

async function ShoppingCart(req, res) {
    try {
        const { type, sellers, items } = req.body;

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

            // Query untuk menemukan dokumen spesifik dengan pelanggan dan penjual tertentu
            const query = shoppingCartRef
                .where('customers', '==', customers)
                .where('sellers', '==', sellers);

            // Eksekusi query
            const querySnapshot = await query.get();

            if (querySnapshot.empty) {
                // Jika tidak ada dokumen ditemukan, buat yang baru
                const cart_id = uuidv4();
                const newCart = {
                    customers: customers,
                    sellers: sellers,
                    alamat: alamat,
                    items: [
                        {
                            product_id: items,
                            qty: 1,
                        },
                    ],
                    cart_id: cart_id,
                };

                await shoppingCartRef.add(newCart);
                return res.status(201).json({ success: true, message: 'New shopping cart created.' });
            } else {
                // Jika dokumen ditemukan, perbarui yang sudah ada
                const cartDoc = querySnapshot.docs[0];
                const cartData = cartDoc.data();
                const itemsArray = cartData.items;

                const existingItem = itemsArray.find(item => item.product_id === items);

                if (type === 'plus') {
                    if (existingItem) {
                        // Jika product_id sudah ada, tambahkan jumlahnya
                        existingItem.qty += 1;
                    } else {
                        // Jika product_id belum ada, tambahkan item baru ke array
                        itemsArray.push({
                            product_id: items,
                            qty: 1,
                        });
                    }
                } else if (type === 'minus') {
                    if (existingItem) {
                        // Jika product_id ada, kurangi jumlahnya
                        existingItem.qty -= 1;

                        // Hapus item jika jumlahnya menjadi 0
                        if (existingItem.qty === 0) {
                            const index = itemsArray.indexOf(existingItem);
                            itemsArray.splice(index, 1);
                        }
                    } else {
                        // Handle jika product_id tidak ditemukan (opsional)
                        return res.status(404).json({ success: false, message: 'Item not found in the shopping cart.' });
                    }
                }

                // Perbarui dokumen di Firestore
                await cartDoc.ref.update({
                    items: itemsArray,
                });

                return res.status(200).json({ success: true, message: 'Shopping cart updated successfully.' });
            }
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error processing shopping cart:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    ShoppingCart,
};
