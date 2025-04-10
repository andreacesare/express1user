

const {getSequelize} = require("../config/configDB");
const {DataTypes} = require("sequelize");


const sequelize=getSequelize();

const Role=sequelize.define('role',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    description:{
        type: DataTypes.TEXT,
    },
    createdDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }

},{
    timestamps: false,
    tableName: 'role'
});
module.exports=Role;