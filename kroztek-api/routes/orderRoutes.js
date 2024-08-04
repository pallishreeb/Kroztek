const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const passport = require("passport");
router.post('/create', orderController.createOrder);

// Get all orders
router.get('/',  passport.authenticate("jwt", { session: false }),orderController.getAllOrders);

// Update an order
router.put('/:orderId', passport.authenticate("jwt", { session: false }), orderController.updateOrder);

// Delete an order
router.delete('/:orderId',  passport.authenticate("jwt", { session: false }),orderController.deleteOrder);

router.get('/:orderId', orderController.getOrder);
router.get('/user/:userId', orderController.getOrdersByUser);
module.exports = router;
