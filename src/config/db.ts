import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

const { DB_SERVER, DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env
export const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_SERVER!,
  dialect: 'mysql',
  port: Number(DB_PORT)
})

