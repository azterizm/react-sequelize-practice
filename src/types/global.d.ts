import { UserAttributes } from "./modelTypes";

declare global {
  interface Window {
    APP_STATE: AppState
  }

  namespace Express {
    interface User extends UserAttributes {}
  }
}
