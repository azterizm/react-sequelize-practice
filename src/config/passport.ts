import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/User"
import { UserAttributes } from "../types/modelTypes"

export default () => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } })
      if (!user) return done(null, false, { message: 'Incorrect username' })
      const validates = await user.validPassword(password)
      if (!validates) return done(null, false, { message: 'Incorrect password' })
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findByPk(id)
      return done(null, user as UserAttributes)
    } catch (error) {
      return done(error)
    }
  })

}
