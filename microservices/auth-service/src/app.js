import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from 'cors';
import router from "./routes/router.js"
import sequelize from "./config/database.js";
import Company from './models/Company.js';
import User from './models/User.js';
import UserConfiguration from './models/UserConfiguration.js';
import UserProfile from './models/UserProfile.js';

const PORT = 3001;
dotenv.config();

// Verificar conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // Sincronizar modelos
        return sequelize.sync({ force: false });
    })
    



const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
};

const app = express();

 app.use(session(sessionConfig));


 app.use(cors({
    origin: ['https://mikelurrestarazu.com', 'http://localhost:5173', 'https://admin.mikelurrestarazu.com','http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use(express.static("Public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => console.log("Servidor web en marcha en puerto 3000."));