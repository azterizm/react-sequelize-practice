import { PostAttributes, UserAttributes } from "../modelTypes";

export interface PostListData extends PostAttributes {
  User: UserAttributes
}
