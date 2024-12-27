import cors from "cors";     //used to maintain security purpose and origin access
import mongoose from "mongoose";   //used to interact with MongoDB databases through schemas and models.
import express from "express";    //imported Express module is used to create a web application or API server.
import * as dotenv from "dotenv";   // Node.js module that loads environment variables from a .env file into process.env for secure and manageable configuration.
import PostRouter from "./routes/Posts.js"
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();   //dotenv package is being initialized to load environment variables

const app = express();   //The variable that holds the created Express application, which can then be used to define routes, middleware, and handle HTTP requests and responses.
app.use(cors());   // line of code used in an Express application to enable CORS (Cross-Origin Resource Sharing) for handling requests from different origins.
app.use(express.json({ limit: "50mb" }));   //used to parse incoming JSON payloads in HTTP requests, with a size limit of 50MB, in an Express application.
app.use(express.urlencoded({ extended: true }));  //allows your Express app to handle data from HTML forms. The { extended: true } part means it can handle complex, nested objects in the form data.

//error handler 
// This middleware function handles errors in an Express app. It checks if the error object has a status property; if not, it defaults to 500 (server error). It then responds with a JSON object containing the success status (false), the error status, and an error message.
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!!!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

//Default get
//This code defines an Express GET route at the root URL that sends a JSON response with a status of 200 and a message "Hello Guys".
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello Guys"
    });
});

//function to connect mongodb with server
//The connectDB function connects to a MongoDB database using Mongoose, setting strict query mode and logs a success message if the connection is successful or an error message if it fails. The MongoDB URL is retrieved from the environment variables.
// const mongodbUrl = "mongodb+srv://kashishrathore0111:DFdIO23kUw6nGB20@cluster0.dkzzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("Failed to Connect to DB")
        console.error(err);
    })
}

//function to start the server
//The startServer function starts an Express server on port 8080 and logs a message when it successfully starts. If there is an error during the startup, it logs the error to the console.
const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log("Server started on port 8080"));
    }
    catch (error) {
        console.log(error);
    }
};

startServer();