const express = require("express");
const app = express();
const port = 3000;
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

// const productRouter = require("./Routes/product");
// const authRouter = require("./Routes/auth");

// Route 1
// app.get("/product", async (req, res) => {
//   await res.send("Hello World!");
// });

// Route 2
// app.use("/api", productRouter);
// app.use("/api", authRouter);

// Route 3
readdirSync("./Routes").map((path) => {
  app.use("/api", require("./Routes/" + path));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
