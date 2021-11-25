const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item')

exports.getAllOrders = async (req, res) => {
    try {
        const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });
        res.status(200).send(orderList);
    } catch (err) {
        res.status(500).json({ success: false },{message: err})
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name')
            .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
        res.status(200).send(order);
    } catch (err) {
        res.status(500).json({ success: false }, { message: err })
    }
}