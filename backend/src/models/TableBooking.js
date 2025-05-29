import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";


const TableBooking = sequelize.define('TableBooking',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    partySize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatingPreference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
  },
  {
    timestamps:true,
  }
);



export default TableBooking;