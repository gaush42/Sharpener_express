// Dummy Data for demonstration
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

exports.getAllUsers = (req, res) => {
    res.send("Fetching all users");
};

exports.addUser = (req, res) => {
    res.send("Adding a new user");
};

exports.getUserById = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user) {
        res.send(`Fetching user with ID: ${req.params.id}`);
    } else {
        res.status(404).send("User not found");
    }
};
