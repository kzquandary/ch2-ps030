const { firestore } = require("../Firebase");

async function GetTotalPrice(req, res) {
  try {
    const { id } = req.params;

    // Get reference to the shopping_cart collection
    const shoppingCartRef = firestore.collection("shopping_cart");

    // Retrieve the document by cart ID
    const cartQuery = await shoppingCartRef
      .where("cart_id", "==", id)
      .get();

    if (cartQuery.empty) {
      res
        .status(404)
        .json({
          success: false,
          message: "Shopping cart not found for the specified ID.",
        });
    } else {
      // Assuming cart_id is unique, there should be only one document in the result set
      const cartDoc = cartQuery.docs[0];
      const cartData = cartDoc.data();
      const items = cartData.items;

      let totalPrice = 0;

      // Calculate total price based on product IDs and quantities
      for (const item of items) {
        const productQuery = await firestore
          .collection("product")
          .where("product_id", "==", item.product_id)
          .get();

        if (!productQuery.empty) {
          const productDoc = productQuery.docs[0];
          const productData = productDoc.data();
          totalPrice += parseFloat(productData.product_price) * item.qty;
        }
      }

      res.status(200).json({ success: true, price: totalPrice });
    }
  } catch (error) {
    console.error("Error getting total price:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  GetTotalPrice,
};
