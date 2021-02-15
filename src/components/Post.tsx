import axios from "axios";
import React, { FC, useEffect, useState } from 'react';
import { createUseStyles, useTheme } from "react-jss";
import { Link, useHistory, useParams } from "react-router-dom";
import leftArrow from '../assets/left-arrow.svg';
import { PostAttributes } from "../types/modelTypes";

export const Post: FC = () => {
  const [data, setData] = useState<PostAttributes | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const theme = useTheme()
  const styles = useStyles({ theme })
  const history = useHistory()
  const UserId: number | null = typeof window !== 'undefined' ? window.APP_STATE.user.id : null
  const { postId }: { postId: string } = useParams()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data } = await axios.post(`/api/post/${postId}`, { UserId })
      setData(data)
      setLoading(false)
    })()
  }, [])

  const handleDelete = async () => {
    setLoading(true)
    const { data } = await axios.delete(`/api/post/remove/${postId}`, {
      data: { UserId }
    })
    if (data.code === 200) return history.push('/')
    setLoading(false)
    return setError(true)
  }

  if (loading) return (
    <div className="post">
      <Link className={styles.a} to='/'><img className={styles.icon} src={leftArrow} alt='' width='13' /> Go back</Link>
      <h1>Loading...</h1>
    </div>
  )

  return (
    <div className="post">
      <Link className={styles.a} to='/'><img className={styles.icon} src={leftArrow} alt='' width='13' /> Go back</Link>
      <h1 className={styles.headings}>{data?.title}</h1>
      <span>
        {new Date(data?.createdAt as unknown as string).toLocaleDateString()}<br />
        {new Date(data?.createdAt as unknown as string).toLocaleTimeString()}
      </span>
      <p>{data?.content}</p>

      {data?.UserId === UserId && (
        <div className={styles.options}>
          <h3>Options</h3>
          <ul className={styles.optionsList}>
            <li>
              <button onClick={handleDelete}>Delete</button>
            </li>
            <li>
              <button>
              <Link to={`/update/${postId}`}>Update</Link>
              </button>
            </li>
          </ul>
        </div>
      )}

      {error && (
        <h1 className={styles.error}>Something went wrong. Please try again.</h1>
      )}
    </div>
  )
}

const useStyles = createUseStyles({
  headings: {
    margin: [10, 0]
  },
  a: {
    textDecoration: 'none',
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
  options: {
    marginTop: 10,
    '& h3': {
      margin: [8, 0]
    },
    '& button, & a': {
      color: 'red'
    },
    '& a': {
      textDecoration: 'none',
      '&:visited': {
        color: 'red'
      }
    }
  },
  error: {
    color: 'red'
  },
  optionsList: {
    margin: 0
  }
})
