import { UserAttributes, UserInstance } from "../models/types";

declare global {
  interface Window {
    APP_STATE: AppState
  }

  namespace Express {
    interface User extends UserAttributes {}
  }
}
