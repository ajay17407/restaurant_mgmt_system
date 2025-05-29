import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";


const User = sequelize.define("User",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  },
  {
    timestamps: true
  }
);


export default User;