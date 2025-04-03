exports.getCartByUserId = (req, res) => {
    res.send(`Fetching cart for user with ID: ${req.params.userId}`);
};


exports.addToCart = (req, res) => {
    res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
};