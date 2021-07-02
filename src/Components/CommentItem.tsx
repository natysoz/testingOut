import React, { useMemo } from 'react'
import styled from 'styled-components'
import { IComment } from 'Store/CommentStore'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { FaUserAlt } from 'react-icons/all'

type PropTypes = {
  comment: IComment
}

const CommentItem = ({ comment }: PropTypes) => {
  const { userEmail } = useSelector((state: RootState) => state.UserStore)

  const isMyComment = useMemo(() => comment.email === userEmail, [
    comment.email,
    userEmail,
  ])

  const validId = useMemo(() => {
    return comment.id.toString().length > 3 ? '' : comment.id
  }, [comment.id])

  return (
    <CommentItemContainer scaleOnHover>
      <Row>
        <CommentID owner={isMyComment}>
          {isMyComment ? (
            <Icon>
              <FaUserAlt />
            </Icon>
          ) : (
            validId
          )}
        </CommentID>
        <Col>
          <CommentEmail>
            <Span>By:</Span> {comment.email}
          </CommentEmail>
          <div>
            <Span>Name:</Span> {comment.name}
          </div>
          <div>
            <Span>Message:</Span>
            <P> {comment.body}</P>
          </div>
        </Col>
      </Row>
    </CommentItemContainer>
  )
}

const Icon = styled.div`
  color: black;
`

const P = styled.p`
  color: #878787;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px;
  padding: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Span = styled.span`
  font-weight: bolder;
  color: white;
`

const CommentEmail = styled.div``

const CommentID = styled.div<{ owner: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 40px;
  width: 40px;
  background-color: ${({ owner }) => (owner ? '#fdcd42' : '#416eaf')};
  color: white;
  padding: 10px;
  font-weight: bold;
  border-radius: 19px;
`

export const CommentItemContainer = styled.div<{ scaleOnHover?: boolean }>`
  display: flex;
  flex-direction: column;
  color: #afafaf;
  width: 100%;
  height: 100%;
  margin: 10px;
  background-color: #222b36;
  box-shadow: rgb(0 0 0 / 13%) -4px 10px 19px 0px,
    rgb(0 0 0 / 50%) 0px 3px 4px -2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 20px;
  padding: 25px;
  :hover {
    transform: ${({ scaleOnHover }) => (scaleOnHover ? 'scale(1.01)' : '')};
  }
`

export default CommentItem
