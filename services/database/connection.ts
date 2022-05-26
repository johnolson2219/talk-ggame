import { Sequelize } from 'sequelize'

const HOST = process.env.HOST as string
const PORT = process.env.PORT as string
const USER_DB = process.env.USER_DB as string
const PASSWORD = process.env.PASSWORD as string
const DATABASE = process.env.DATABASE as string

const sequelize = new Sequelize(
  `mysql://${USER_DB}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`,
  {
    define: { freezeTableName: true },
  }
)

export { sequelize }
