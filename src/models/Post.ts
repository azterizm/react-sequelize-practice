import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { PostInstance } from "../types/modelTypes";

export const Post = sequelize.define<PostInstance>('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  UserId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  paranoid: true
})

