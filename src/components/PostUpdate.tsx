import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { FC, useState } from "react";
import leftArrow from '../assets/left-arrow.svg'
import { createUseStyles, useTheme } from "react-jss";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostResponse } from "../types/components/Login";

export const PostUpdate: FC = () => {
  const { postId }: { postId: string } = useParams()
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const history = useHistory()
  const theme = useTheme()
  const styles = useStyles({ theme })
  const UserId: number | null = typeof window !== 'undefined' ? window.APP_STATE.user.id : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { data }: { data: PostResponse } = await axios.put(`/api/post/update/${postId}`, {
      title, content, UserId
    })
    if (data.code === StatusCodes.OK) return history.push(`/post/${postId}`)
    setLoading(false)
    return setError(true)
  }

  if (loading) return (
    <form>
      <Link className={styles.a} to='/'><img className={styles.icon} src={leftArrow} alt='' width='13' /> Go back</Link>
      <h1>Loading...</h1>
    </form>
  )

  if (error) return (
    <form>
      <Link className={styles.a} to='/'><img className={styles.icon} src={leftArrow} alt='' width='13' /> Go back</Link>
      <h1 className={styles.error}>Something went wrong. Please try again.</h1>
    </form>
  )

  return (
    <form onSubmit={handleSubmit}>
      <Link className={styles.a} to={`/post/${postId}`}><img className={styles.icon} src={leftArrow} alt='' width='13' /> Go back</Link>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        className={styles.content}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

const useStyles = createUseStyles({
  a: {
    textDecoration: 'none',
    display: 'block',
    margin: [10, 0],
    color: '#006800',
    '&:visited': {
      color: '#006800'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  icon: {
    filter: ({ theme }) => theme.filter
  },
  error: {
    color: 'red'
  },
  content: {
    height: 200,
    width: '100%'
  }
})
