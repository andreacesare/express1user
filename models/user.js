const {DataTypes} = require('sequelize');
const {getSequelize} = require('../config/configDB');
const Role = require('./role');


const sequelize = getSequelize();

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    passwordExpirationDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'passwordexpirationdays',
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createddate',
    },
    lastModifiedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'lastmodifieddate',
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'user',
});


module.exports= User;
