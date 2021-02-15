import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { ensureLoggedIn, ensureLoggedInNoDB } from "./middlewares";

const router = Router()

//specify attributes
router.get('/', ensureLoggedInNoDB, async (_, res) => {
  try {
    const data = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      attributes: ['id', 'title', 'createdAt'],
      order: [['createdAt', 'DESC']]
    })
    return res.json(data)
  } catch (error) {
    res.json({ code: StatusCodes.INTERNAL_SERVER_ERROR, err: error })
  }
})

router.post('/new', ensureLoggedIn, async (req, res) => {
  try {
    const { title, content, UserId } = req.body
    if (!title || !content || !UserId) return res.json({
      code: StatusCodes.BAD_REQUEST,
      message: 'Required parameters not found.'
    })
    const post = await Post.create({ title, content, UserId })
    return res.json({
      code: StatusCodes.CREATED,
      message: 'Post was successfully created.',
      postId: post.id
    })
  } catch (error) {
    return res.json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      err: error
    })
  }
})

router.delete('/remove/:postId', ensureLoggedIn, async (req, res) => {
  try {
    const { postId } = req.params

    const user = req.user
    const post = await Post.findByPk(postId)

    const authorized = post?.UserId === user?.id

    if (!authorized) return res.json({
      code: StatusCodes.UNAUTHORIZED,
      message: 'User is not logged in.'
    })

    const postDeletion = await Post.destroy({ where: { id: postId, UserId: user?.id } })
    return res.json({
      code: StatusCodes.OK,
      message: 'Post was successfully deleted.',
      additionalInfo: {
        returnValue: postDeletion
      }
    })
  } catch (err) {
    return res.json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      err
    })
  }
})

router.put('/update/:postId', ensureLoggedIn, async (req, res) => {
  try {
    const { postId } = req.params
    const { title, content } = req.body

    const user = req.user
    const post = await Post.findByPk(postId)

    const authorized = post?.UserId === user?.id

    if (!authorized) return res.json({
      code: StatusCodes.UNAUTHORIZED,
      message: 'User is not logged in.'
    })

    const postUpdate = await Post.update({ title, content }, {
      where: { id: postId, UserId: user?.id }
    })

    return res.json({
      code: StatusCodes.OK,
      message: 'Post was successfully updated.',
      additionalInfo: {
        returnValue: postUpdate
      },
    })
  } catch (err) {
    return res.json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      err
    })
  }
})

router.post('/:postId', ensureLoggedIn, async (req, res) => {
  try {
    const { postId } = req.params
    const data = await Post.findByPk(postId, {
      attributes: ['title', 'content', 'createdAt', 'UserId']
    })
    return res.json(data)
  } catch (err) {
    return res.json({ err, code: StatusCodes.INTERNAL_SERVER_ERROR })
  }
})

export default router
