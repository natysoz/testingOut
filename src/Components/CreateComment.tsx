import React, { useRef, useState } from 'react'
import { CommentItemContainer } from './CommentItem'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { postComment } from 'Store/CommentStore'
import Button from './Button/Button'

const CreateComment = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLTextAreaElement>()
  const [commentText, setCommentText] = useState(
    'Best Demo MSG! Create more Morty! Baaa..'
  )
  const { userEmail } = useSelector((state: RootState) => state.UserStore)
  const comments = useSelector((state: RootState) => state.CommentStore)
  const handleCreateComment = () => {
    if (commentText.length > 10) {
      dispatch(
        postComment({
          postId: 1,
          id: comments.length + 1 + generateId(10),
          name: 'Rick and Mortyyy! dub dub.',
          email: userEmail,
          body: commentText,
        })
      )
      setCommentText('')
    }
    if (inputRef.current) inputRef.current.focus()
  }

  const handleTextChange = ({ value }) => {
    setCommentText(value)
  }

  return (
    <CommentItemContainer>
      <Email>{userEmail || 'Demo@demo.com'}</Email>
      <TextArea
        isFocused={document.activeElement === inputRef.current}
        hasError={commentText.length < 10}
        ref={inputRef}
        value={commentText}
        onChange={({ target }) => handleTextChange(target)}
      />
      <Button action={handleCreateComment} text="Add Comment" />
    </CommentItemContainer>
  )
}

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0')
}
function generateId(len) {
  let arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

const Email = styled.div`
  padding: 10px;
`
const TextArea = styled.textarea<{ hasError: boolean; isFocused: boolean }>`
  border: ${({ hasError, isFocused }) =>
    isFocused && hasError ? '1px solid red' : '1px solid #222b36'};
  margin: 10px;
  padding: 10px;
  resize: none;
`

export default CreateComment
