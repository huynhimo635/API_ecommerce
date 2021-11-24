const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const helmet = require("helmet");
require("dotenv/config");
const compression = require("compression");
const path = require('path');

app.use(cors());
app.options("*", cors());
app.use(helmet());

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(authJwt());
app.use("/public/uploads", express.static(path.join(__dirname + "/public/uploads")));
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//compression
app.use(
    compression({
        level: 6,
        threshold: 10 * 1000,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
    })
);

//Database
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        dbName: "ecommerce_api",
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log(err);
    });

//Server
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running at port ${port}`);
});
