import { createSlice } from '@reduxjs/toolkit'

export interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type CommentState = IComment[]
const initialState: CommentState = []

const commentSlice = createSlice({
  name: 'commentStore',
  initialState,
  reducers: {
    setComments: (state, action) => {
      return [...state, ...action.payload]
    },
    addComment: (state, action) => {
      state.splice(0, 0, action.payload)
    },
    resetComments: (state) => [],
  },
})

export const fetchComments = (from: number) => ({
  type: 'fetch/comments',
  meta: {
    api: true,
    authRequire: true,
    debounce: true,
  },
  payload: {
    method: 'get',
    networkLabel: 'fetch/comments',
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    path: `comments?_start=${from}&_limit=20`,
    headers: {
      'Content-Type': 'application/json',
    },
    onSuccess: (data: any) => setComments(data),
    onError: () => {},
  },
})

export const postComment = (comment) => ({
  type: 'post/comment',
  meta: {
    api: true,
    authRequire: true,
    debounce: true,
  },
  payload: {
    method: 'post',
    networkLabel: 'post/comment',
    baseUrl: 'https://test.steps.me/test/testAssignComment',
    path: '',
    headers: {
      'Content-Type': 'application/json',
    },
    data: comment,
    onSuccess: () => addComment(comment),
    onError: () => {},
  },
})
export const { setComments, addComment, resetComments } = commentSlice.actions

export default commentSlice.reducer
