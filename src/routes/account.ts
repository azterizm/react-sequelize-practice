import { Router } from "express";
import passport from "passport";
import { User } from "../models/User";
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res
      .json({ code: StatusCodes.INTERNAL_SERVER_ERROR, err, flash: req.flash() })

    let valid: boolean = false
    if (info && info.message === 'Incorrect password') valid = true

    if (!user) return res
      .json({
        code: StatusCodes.NOT_FOUND,
        message: 'User not found',
        additionalInfo: info,
        user: req.body.username,
        valid
      })

    req.logIn(user, (err) => {
      if (err) return res
        .json({ code: StatusCodes.INTERNAL_SERVER_ERROR, err, flash: req.flash() })
      return res
        .json({
          code: StatusCodes.OK,
          message: 'User has successfully logged in.',
          additionalInfo: info,
          user,
          valid
        })
    })
  })(req, res)
})

router.post(
  '/logout',
  (req, res) => {
    req.logout()
    res.redirect('/')
  }
)

router.post(
  '/signup',
  async (req, res) => {
    const { username, password } = req.body

    const userFound = await User.findOne({ where: { username } })
    if (userFound) return res.json({
      message: 'You already have an account. Please consider signing in.'
    })

    return await User.create({ username, password }).then(() => (
      res.json({
        message: 'Account was successfully created!'
      })
    ))
  }
)

export default router
