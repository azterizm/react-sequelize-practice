import axios from "axios";
import React, { FC, useEffect, useState } from 'react';
import { createUseStyles, useTheme } from "react-jss";
import { Link } from "react-router-dom";
import { PostListData } from "../types/components/PostList";

export const PostList: FC = () => {
  const [data, setData] = useState<PostListData[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme()
  const styles = useStyles({ theme })

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data }: { data: PostListData[] } = await axios.get('/api/post')
      setData(data)
      setLoading(false)
    })()
  }, [])

  if (loading || !data) return (
    <div className="posts">
      <h1>Loading...</h1>
    </div>
  )

  return (
    <div className={styles.posts}>
      {data?.map(post => (
        <div key={post.id} className={styles.post}>
          <h1 className={styles.headings}>
            <Link className={styles.a} to={`/post/${post.id}`}>{post.title}</Link>
          </h1>
          <span>{post.User.username}</span><br />
          <span>
            {new Date(post.createdAt as unknown as string).toLocaleDateString()}<br />
            {new Date(post.createdAt as unknown as string).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export const useStyles = createUseStyles({
  a: {
    textDecoration: 'none',
    color: '#006800',
    '&:visited': {
      color: '#006800',
    },
    '&:focus': {
      outline: 'none'
    }
  },
  headings: {
    margin: 0,
  },
  posts: {
  },
  post: {
    margin: [20, 0],
    padding: 30,
    borderRadius: 30,
    background: ({ theme }) => theme.postBackground
  }
})
