const { firestore } = require("../Firebase");
const jwt = require("jsonwebtoken");

async function AddTransactionByCartId(req, res) {
  try {
    const authorizationHeader = req.headers.authorization;
    const { cart_id, notes } = req.body;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Extract token from header Authorization
    const token = authorizationHeader.split(" ")[1];

    try {
      // Verify JWT token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get customer information from the token
      const customers = decodedToken.username;

      // Get reference to the shopping_cart collection
      const shoppingCartRef = firestore.collection("shopping_cart");

      // Query to find a specific document with the given cart_id
      const cartQuery = await shoppingCartRef
        .where("cart_id", "==", cart_id)
        .get();

      // Check if the cart with the given cart_id exists
      if (cartQuery.empty) {
        return res
          .status(404)
          .json({ success: false, message: "Shopping cart not found." });
      }

      // Assume there is only one document with the specified cart_id
      const cartDoc = cartQuery.docs[0];
      const cartData = cartDoc.data();

      // Get reference to the transaction collection
      const transactionRef = firestore.collection("transaction");

      // Generate transaction_id from cart_id
      const transaction_id = cart_id;

      // Create new transaction object
      const newTransaction = {
        customers,
        sellers: cartData.sellers,
        items: cartData.items,
        total: cartData.total_price,
        alamat: cartData.alamat,
        note: notes,
        status: "Pending", // You can set the initial status as needed
        transaction_id,
      };

      // Add the transaction to the transaction collection
      await transactionRef.add(newTransaction);

      // Delete the shopping cart with the given cart_id
      await cartDoc.ref.delete();

      res
        .status(201)
        .json({ success: true, message: "Transaction added successfully." });
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  AddTransactionByCartId,
};
