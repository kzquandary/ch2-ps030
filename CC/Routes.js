require("dotenv").config();
var express = require("express");
var routes = express.Router();
const jwt = require("jsonwebtoken");
const { Login } = require("./Auth/Login");
const { Register } = require("./Auth/Register");
const { ConfirmEmail } = require("./Auth/ConfirmEmail");
const { ForgotPassword } = require("./Auth/ForgotPassword");
const { Authorization } = require("./Middleware/Authorization");
const {
  getCustomerById,
  getCustomers,
} = require("./HomeCustomers/CustomersControllers");
const { getSellerById, getSellers } = require("./HomeUMKM/SellersControllers");
const { AddProduct } = require("./Product/AddProduct");
const { GetProductById } = require("./Product/GetProductById");
const { GetProductBySeller } = require("./Product/GetProductBySeller");
const { GetProductByCategory } = require("./Product/GetProductByCategory");
const { UpdateProduct } = require("./Product/UpdateProduct");
const { ShoppingCart } = require("./ShoppingCart/ShoppingCart");
const { GetCartByCustomers } = require("./ShoppingCart/GetCartByCustomers");
const { GetCartById } = require("./ShoppingCart/GetCartById");
const { GetTotalPrice } = require("./ShoppingCart/GetPriceTotal");
routes.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API Active" });
});

//Home Routes
routes.post("/api/home/parseaddress", ParseAddress);
routes.get("/api/home/getdomisili/:domisili", GetUMKMByDomisili);

// Auth Routes
routes.post("/api/auth/login", Login);
routes.post("/api/auth/register", Register);
routes.post("/api/auth/confirm", ConfirmEmail);
routes.post("/api/auth/forgotpassword", ForgotPassword);

// Customers Page Routes
routes.get("/api/customers", getCustomers);
routes.get("/api/customers/:id", getCustomerById);

// Sellers Pages Route
routes.get("/api/sellers", getSellers);
routes.get("/api/sellers/:id", getSellerById);
routes.put("/api/setstatustoko/");

// Product Routes
routes.get("/api/product/:id", GetProductById);
routes.get("/api/product/seller/:username", GetProductBySeller);
routes.get("/api/product/category/:category", GetProductByCategory);
routes.post("/api/product", AddProduct);
routes.put("/api/product", UpdateProduct);

//ShoppingCart Routes
routes.post("/api/shopping", ShoppingCart);
routes.get("/api/shopping/:customers", GetCartByCustomers);
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
// routes.post('/api/transactions/', Transaction);
// routes.get('/api/transactions/:id', Transaction);
// routes.get('/api/transactions/details/:id', Transaction);

// Review Routes

// Middleware Route
routes.post("/api/middleware/authorization", Authorization);

module.exports = routes;
