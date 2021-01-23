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
const imageStorageRouter = require('./routes/imageStorage.routes');

//Runs the database
connectToDb().catch(error => console.log(error));
//TODO change this to get from env instead
//PROD
//https://wonderful-shaw-bf821f.netlify.app/
//https://receptmingel.herokuapp.com/

//DEV
//http://localhost:3000/
//https://localhost:8080/

// Middlewares
app.use(
    cors({
        //PROD
        //origin: ["https://wonderful-shaw-bf821f.netlify.app", "https://receptmingel.herokuapp.com"],
        //DEV
        origin: "http://localhost:3000",
        credentials: true,
    })
); 

app.set('trust proxy', true)
//TODO: Add sessions for login-tracking
app.use(
    session({
        name: "happy",
        secret: "foodie",
        //resave: false,
        saveUninitialized: false, 
        maxAge: 1000 * 60 * 60* 2,
        cookie: {
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60* 2,
        }, 
        store: new MongoStore({ mongooseConnection: mongoose.connection}),
        //expires: new Date(Date.now() + (30 * 86400 * 1000))
    })
)

//Parses reg.body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO: API resources
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);
app.use("/api/images", imageStorageRouter);

//Error Handling
app.use((err, req, res, next) => {
    handleError(err, res)
})

const PORT = process.env.PORT ? process.env.PORT : 8080

app.listen(PORT, () => {
    console.log(`server is upp an running on port : ${PORT}`);
})