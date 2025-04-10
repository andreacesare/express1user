import express from "express";
import {getSequelize} from "./config/configDB.js";
import users from "./routes/users.js";
const sequelize=getSequelize();

const app=express();
const port = 3000;
app.use(express.json());
app.use("/api/user",users);

sequelize.authenticate()
    .then(() => {
        console.log('✅ Connessione al database riuscita!');
        app.listen(port, () => console.log(`🚀 Server in ascolto sulla porta ${port}`));
    })
    .catch(error => console.error('❌ Errore nella connessione al database:', error));