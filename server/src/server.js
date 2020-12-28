const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const { handleError } = require('./helpers/error.helper')
const { connectToDb, mongoose } = require('./mongo');
require("dotenv").config();

//import Routes
const userRouter = require('./routes/user.routes');
const recipeRouter = require('./routes/recipe.routes');

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
app.use(
    session({
        name: "If you can be anything, be",
        secret: "a unicorn",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
)

//Parses reg.body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO: API resources
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);

//Error Handling
app.use((err, req, res, next) => {
    handleError(err, res)
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is upp an running on port : ${PORT}`);
})