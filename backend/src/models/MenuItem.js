import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const MenuItem = sequelize.define('MenuItem',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: DataTypes.STRING,
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
  },
  {
    timestamps: true
  }
);

export default MenuItem;