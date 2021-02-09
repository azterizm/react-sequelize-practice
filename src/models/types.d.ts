import { Model } from 'sequelize'

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

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  validPassword: (arg: string) => boolean,
}
