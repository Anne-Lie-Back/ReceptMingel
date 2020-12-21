const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDb } = require('./mongo');
require("dotenv").config();


//Runs the database
connectToDb();

// Middlewares
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:8080"],
        credentials: true,
    })
); 

//TODO: Add sessions for login-tracking

//Parses reg.body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO: API resources

//TODO Error Handling

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is upp an running on port : ${PORT}`);
})