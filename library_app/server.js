const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db_config");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("view"));
app.use("/books", bookRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
