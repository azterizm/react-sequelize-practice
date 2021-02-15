import { Model } from 'sequelize'

export interface UserAttributes {
  id: number,
  username: string,
  password: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface UserCreationAttributes {
  username: string,
  password: string
}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  validPassword: (arg: string) => boolean,
}


export interface PostAttributes {
  id: number,
  title: string,
  content: string,
  UserId: number,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date
}

export interface PostCreationAttributes {
  title: string,
  content: string,
  UserId: number
}

export interface PostInstance extends Model<PostAttributes, PostCreationAttributes>, PostAttributes {}
