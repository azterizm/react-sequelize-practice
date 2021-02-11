import { StatusCodes } from "http-status-codes";
import { UserInstance } from "../../models/types";

export interface LoginResponse {
  code: StatusCodes,
  err?: any,
  flash?: {
    [x:string]: string[]
  },
  message?: string,
  additionalInfo?: any,
  user?: UserInstance | boolean,
  valid?: boolean
}
