const {DataTypes} = require('sequelize');
const {getSequelize} = require('../config/configDB');


const sequelize = getSequelize();

const Blacklist = sequelize.define("Blacklist", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        },
        field: 'userid'
    },
    createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createddate',
    }
}, {
    tableName: "blacklist",
    timestamps: false
});

module.exports = Blacklist;