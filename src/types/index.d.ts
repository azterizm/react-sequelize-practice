interface AppState {
  user: User,
  flash: {
    [x:string]: string[]
  }
}

declare module "*.png" {
  const value: any
  export = value
}

declare module "*.svg" {
  const value: any
  export = value
}
