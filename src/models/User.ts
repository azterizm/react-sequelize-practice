import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import { sequelize } from "../config/db";
import { UserInstance } from "../types/modelTypes";
import { Post } from "./Post";

export const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
      notNull: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  freezeTableName: true,
  hooks: {
    beforeCreate: async (user: UserInstance) => {
      user.password = await bcrypt.hash(user.password, 10)
    }
  },
})

User.prototype.validPassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
};

User.hasMany(Post)
Post.belongsTo(User)
