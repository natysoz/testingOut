import styled from 'styled-components'
import CommentItem from 'Components/CommentItem'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'
import { fetchComments } from 'Store/CommentStore'
import { ClipLoaderOverride } from 'Components/Login/Login'
import { RootState } from 'store'
import { IComment } from 'Store/CommentStore'
import CreateComment from 'Components/CreateComment'
import InfiScroller from 'react-infi-scroller'

const CommentList = () => {
  const dispatch = useDispatch()
  const [scroll, setScrollPosition] = useState(0)
  const comments = useSelector((state: RootState) => state.CommentStore)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(true)

  const handleLoadMoreComments = () => {
    setLoadingMore(true)
    setScrollPosition((scroll) => scroll + 20)
    dispatch(fetchComments(scroll + 20))
    setHasMore(comments.length < 500)
    setTimeout(() => {
      setLoadingMore(false)
    }, 300)
  }

  useEffect(() => {
    setLoading(true)
    dispatch(fetchComments(scroll))
  }, [dispatch])

  useEffect(() => {
    if (comments.length > 0) {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
  }, [comments.length])

  return (
    <Container>
      {isLoading ? (
        <ClipLoader
          color={'#688eff'}
          loading={isLoading}
          css={ClipLoaderOverride}
          size={150}
        />
      ) : (
        <PostItemContainer>
          <CreateComment />
          <InfiScroller hasMore={hasMore} onLoadMore={handleLoadMoreComments}>
            {comments.map((comment: IComment, index: number) => (
              <CommentItem key={index} comment={comment} />
            ))}
          </InfiScroller>
          {loadingMore && <Loading>Loading More...</Loading>}
        </PostItemContainer>
      )}
    </Container>
  )
}

const Loading = styled.div`
  color: white;
  font-size: 32px;
`

const PostItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2px;
  overflow: unset;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  margin: 0 auto;
  height: calc(100vh - 70px);
  @media (min-width: 768px) {
    width: 850px;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
`

export default CommentList
