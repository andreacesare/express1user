require('./associations/associations');
const express = require('express');
const {getSequelize} = require('./config/configDB');
const cors = require('cors');

const users = require('./routes/users');
const sequelize=getSequelize();


const app=express();
app.use(cors());
const port = 3000;
app.use(express.json());
app.use("/api/user",users);


sequelize.authenticate()
    .then(() => {
      console.log('✅ Connessione al database riuscita!');
      app.listen(port, () => console.log(`🚀 Server in ascolto sulla porta ${port}`));
    })
    .catch(error => console.error('❌ Errore nella connessione al database:', error));


module.exports = app;
