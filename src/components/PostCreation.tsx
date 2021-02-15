import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { FC, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Redirect, useHistory } from "react-router-dom";
import { PostResponse } from '../types/components/Login';

export const PostCreation: FC = () => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<number>(0)

  const UserId = typeof window !== 'undefined' ? window.APP_STATE.user.id : null

  const history = useHistory()
  const styles = useStyles()

  if (!UserId) return <Redirect to='/login' />

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!title || !content) {
      setLoading(false)
      return setError(StatusCodes.BAD_REQUEST)
    }

    const { data }: { data: PostResponse } = await axios.post('/api/post/new', { title, content, UserId })
    if (data.code === 201) return history.push(`/post/${data.postId}`)

    setLoading(false)
    return setError(StatusCodes.INTERNAL_SERVER_ERROR)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="content">Content</label>
      <textarea
        className={styles.content}
        name="content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button type="submit" disabled={loading}>Submit</button>

      {error === StatusCodes.BAD_REQUEST && (
        <h1 className={styles.error}>Both input values are required to create a new post.</h1>
      )}
      {error === StatusCodes.INTERNAL_SERVER_ERROR && (
        <h1 className={styles.error}>Something went wrong. Please try again.</h1>
      )}
    </form>
  )
}

const useStyles = createUseStyles({
  content: {
    height: 200,
    width: '100%'
  },
  error: {
    color: 'red'
  }
})
