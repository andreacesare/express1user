
const {getSequelize} = require("../config/configDB");
const {DataTypes} = require("sequelize");

const sequelize=getSequelize();

const UserRole=sequelize.define("userRole",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
        field: 'userid'
    },
    roleId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'role',
            key: 'id',
        },
        field:'roleid'
    },
    createdDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createddate',
    }

},{timestamps:false,tableName: 'user_role',indexes:[{unique:true,fields:['userId','roleId']}]});
module.exports=UserRole;
