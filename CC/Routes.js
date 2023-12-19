require("dotenv").config();
var express = require("express");
var routes = express.Router();
const jwt = require("jsonwebtoken");
const { Login } = require("./Auth/Login");
const { Register } = require("./Auth/Register");
const { ConfirmEmail } = require("./Auth/ConfirmEmail");
const { ForgotPassword } = require("./Auth/ForgotPassword");
const { Authorization } = require("./Middleware/Authorization");
const { GetCustomer } = require("./HomeCustomers/CustomersControllers");
const { GetSellers } = require("./HomeUMKM/SellersControllers");
const { AddProduct } = require("./Product/AddProduct");
const { GetProductById } = require("./Product/GetProductById");
const { GetProductBySeller } = require("./Product/GetProductBySeller");
const { GetProductByCategory } = require("./Product/GetProductByCategory");
const { UpdateProduct } = require("./Product/UpdateProduct");
const { ShoppingCart } = require("./ShoppingCart/ShoppingCart");
const { GetCartByCustomers } = require("./ShoppingCart/GetCartByCustomers");
const { GetCartById } = require("./ShoppingCart/GetCartById");
const { GetTotalPrice } = require("./ShoppingCart/GetPriceTotal");
const { GetUMKMByDomisili } = require("./HomeCustomers/GetUMKMByDomisili");
const { AddTransaction } = require('./Transactions/AddTransactions');
const { GetTransaction } = require('./Transactions/GetTransaction');
const { GetTransactionById } = require('./Transactions/GetTransactionById');
const { SearchUMKM } = require("./HomeCustomers/SearchUMKM");
const { GetUMKMByUsername } = require("./HomeCustomers/GetUMKMByUsername");
const { GetReviewById } = require("./Review/GetReviewById");
const { GetReviewByUsername } = require("./Review/GetReviewByUsername");
const { AddReview } = require("./Review/AddReview");
const { UpdateProfile } = require("./Profile/UpdateCustomer");
const { GetUMKMTransaction } = require("./HomeUMKM/GetTransaction");
const { GetUMKMProfile } = require("./HomeUMKM/GetUMKMProfile");
const { DeleteProduct } = require("./Product/DeleteProduct");
const { GetSeller } = require("./HomeCustomers/GetAllUMKM");
const { AddTransactionByCartId } = require("./Transactions/AddTransactionByCartId");
const { SearchAllUMKM } = require("./HomeCustomers/SearchAllUMKM");
routes.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API Active" });
});

//Home Routes
routes.get("/api/home/nearbyumkm", GetUMKMByDomisili);
routes.get("/api/home/searchumkm", SearchAllUMKM);
routes.get("/api/home/searchumkm/:nama", SearchUMKM);
routes.get("/api/home/getallumkm", GetSeller);

// Auth Routes
routes.post("/api/auth/login", Login);
routes.post("/api/auth/register", Register);
routes.post("/api/auth/confirm", ConfirmEmail);
routes.post("/api/auth/forgotpassword", ForgotPassword);

// Customers Page Routes
routes.get("/api/customers", GetCustomer);
routes.put("/api/profile/update", UpdateProfile);

// Sellers Pages Route
routes.get("/api/sellers", GetSellers);
routes.get("/api/sellers/details", GetUMKMProfile);
routes.get("/api/sellers/:username", GetUMKMByUsername);
// routes.put("/api/setstatustoko/");
routes.get('/api/sellers/transaksi', GetUMKMTransaction)

// Product Routes
routes.get("/api/product/:id", GetProductById);
routes.get("/api/product/seller/:username", GetProductBySeller);
routes.get("/api/product/category/:category", GetProductByCategory);
routes.post("/api/product", AddProduct);
routes.put("/api/product", UpdateProduct);
routes.delete("/api/product/:product_id", DeleteProduct);

//ShoppingCart Routes
routes.post("/api/shopping", ShoppingCart);
routes.get("/api/shopping/", GetCartByCustomers);
routes.get("/api/shopping/details/:id", GetCartById);
routes.get("/api/shopping/total/:id", GetTotalPrice);

// Settings Routes
// routes.put('/api/settings/changedetails', ForgotPassword);
// routes.put('/api/settings/changepassword', ForgotPassword);
// routes.post('/api/settings/', ForgotPassword);

// Notification Routes
// routes.get('/api/notifications/:id', Notification);
// routes.get('/api/notifications/details/:id', Notification);

// Transaction Routes
routes.post('/api/transactions', AddTransaction);
routes.post('/api/transactionsbyid', AddTransactionByCartId);
routes.get('/api/transactions', GetTransaction);
routes.get('/api/transactions/:id', GetTransactionById);
// routes.get('/api/transactions/:id', Transaction);
// routes.get('/api/transactions/details/:id', Transaction);

// Review Routes
routes.post('/api/review', AddReview);
routes.get('/api/review/', GetReviewByUsername);
routes.get('/api/review/:id', GetReviewById);

// Middleware Route
routes.post("/api/middleware/authorization", Authorization);

module.exports = routes;
