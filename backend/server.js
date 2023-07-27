require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

//MIDDLEWARE
app.use(express.json());

app.use(cors());

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

// ROUTES
const incomeRoute = require("./routes/TransactionRoute");
app.use("/api/transaction", incomeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port", PORT));
