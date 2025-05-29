import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const PreOrderItem = sequelize.define('PreOrderItem',{
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    menuItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    status: {
        type: DataTypes.ENUM('pending','preparing','ready','served'),
        defaultValue: 'pending'
    }
  },
  {
    timestamps: true
  }
);

export default PreOrderItem;