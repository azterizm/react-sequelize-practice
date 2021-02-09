import { Router } from "express";
import passport from "passport";
import { User } from "../models/User";

const router = Router()

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: 'Successfuly logged in.',
    failureFlash: true,
    session: true
  }),
  (_, res) => {
    res.redirect('/')
  }
)

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
