const {DataTypes} = require('sequelize');
const {getSequelize} = require('../config/configDB');


const sequelize = getSequelize();


const UserPassword = sequelize.define("UserPassword", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: "id"
        },
        field: 'userid'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createddate',
    }
}, {
    tableName: "user_password",
    timestamps: false
});

module.exports = UserPassword;


