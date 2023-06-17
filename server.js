
const express = require("express");
const dotenv = require("dotenv").config();
const ErrHandler = require("./middleware/errorHandler");
const DB_connect = require("./Config/DBconnection");

DB_connect.DB_Connection();
const app = express();

const port = process.env.PORT || 3000;

// middlewares
// used for parsing the stream of body
app.use(express.json());
app.use("/api", require("./routes/CmpDataRoutes"));
    
// middleware for error handling
app.use(ErrHandler);

app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
});


