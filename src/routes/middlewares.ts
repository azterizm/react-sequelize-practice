import { ensureLoggedIn as connectEnsureLoggedIn } from 'connect-ensure-login'
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/User"

export const ensureLoggedIn: RequestHandler = async (req, res, next) => {
  const { UserId } = req.body
  const userFound = await User.findByPk(UserId)
  const userLoggedIn = Boolean(req.user)
  if (!userFound || !userLoggedIn) return res.json({
    code: StatusCodes.FORBIDDEN,
    message: 'User is not logged in.'
  })
  connectEnsureLoggedIn('/login')
  return next()
}

export const ensureLoggedInNoDB: RequestHandler = async (req, res, next) => {
  const userLoggedIn = Boolean(req.user)
  if (!userLoggedIn) return res.json({
    code: StatusCodes.FORBIDDEN,
    message: 'User is not logged in.'
  })
  connectEnsureLoggedIn('/login')
  return next()
}

