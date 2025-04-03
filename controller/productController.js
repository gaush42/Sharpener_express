// Dummy Data for demonstration
const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
];

exports.getAllProducts = (req, res) => {
    res.send("Fetching all products");
};

exports.addProduct = (req, res) => {
    res.send("Adding a new product");
};

exports.getProductById = (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (product) {
        res.send(`Fetching product with ID: ${req.params.id}`);
    } else {
        res.status(404).send("Product not found");
    }
};
