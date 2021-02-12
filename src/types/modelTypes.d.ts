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


interface PostAttributes {
  id: number,
  title: string,
  content: string,
  UserId: number,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date
}

interface PostCreationAttributes {
  title: string,
  content: string,
  UserId: number
}

export interface PostInstance extends Model<PostAttributes, PostCreationAttributes>, PostAttributes {}
