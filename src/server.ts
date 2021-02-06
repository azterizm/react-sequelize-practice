import dotenv from 'dotenv'
import express from 'express'
import { DataTypes, Sequelize } from 'sequelize'
import bcrypt from 'bcrypt'
import { Model } from 'sequelize'
dotenv.config()

const app = express()

const { DB_SERVER, DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env
const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_SERVER!,
  dialect: 'mysql',
  port: Number(DB_PORT)
})

interface UserAttributes {
  id: number,
  username: string,
  password: string,
  createdAt?: Date,
  updatedAt?: Date
}

interface UserCreationAttributes {
  username: string,
  password: string
}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  validPassword: (arg: string) => boolean,
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
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

User.sync()

const dbQueries = async () => {
  const user = await User.findOne({ where: { username: 'bro' } })
  return user?.validPassword('secret')
}

dbQueries().then(console.log)

app.get('/', (_, res) => res.send('Hey!'))

console.log('hello')

app.listen(5000, () => console.log('server runnin at', 5000))
