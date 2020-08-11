const Cart = require('../models/Cart');



exports.getCart = (req, res) => {
    Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            if (cart) {
                res.json({ success: true, cart: cart });
            } else {
                res.json({ success: false, cart: null, message: 'unable to find cart items' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}