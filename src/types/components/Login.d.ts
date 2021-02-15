import { StatusCodes } from "http-status-codes";
import { UserInstance } from "../modelTypes";

export interface PostResponse {
  code: StatusCodes,
  err?: any,
  flash?: {
    [x:string]: string[]
  },
  message?: string,
  additionalInfo?: any,
  user?: UserInstance | boolean,
  valid?: boolean,
  postId?: number
}
