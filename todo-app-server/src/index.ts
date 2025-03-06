const express = require("express");
const cors = require("cors");
const mountEncryptRoute = require("./routes/auth_route");
const mountRoute = require("./routes/route");
const basicAuth = require("./routes/_helpers/basic-auth");
const bearerAuth = require("./routes/_helpers/bearer-auth");
const dotenv = require("dotenv");
const pgconnect = require("./pgconnect");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.get('/', (req: any, res: any) => {
    res.send("Welcome to Task To-do App Server");
});

app.use('/', mountRoute);
app.use(bearerAuth);
app.use('/api', mountEncryptRoute);

const port: any = process.env.APPPORT;

app.listen(port, async () => {
    try {
        console.log("Task To-do App Server Listening on Port : " + port);
        let connect = await pgconnect.connectDB();
        console.info(connect.message);
    } catch (error: any) {
        console.error("Error in connecting to PostgreSQL Database", error);
    }
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Perform cleanup and exit process if necessary
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Perform cleanup and exit process if necessary
});
