import React from 'react'
import styled from 'styled-components'
import AppLogo from '../Logo/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { FiLogOut } from 'react-icons/fi'
import { removeUser } from 'Store/UserStore'
import { resetComments } from '../../Store/CommentStore'
import { dispatchActions } from '../../Middleware/ApiMiddleware'

const TopNavigator = () => {
  const { isAuth } = useSelector((state: RootState) => state.UserStore)
  const dispatch = useDispatch()
  const handleLogout = () =>
    dispatchActions(dispatch, [resetComments, removeUser])
  return (
    <Container>
      <LeftContent>
        <AppLogo />
        <Title>Post Application 2.0</Title>
      </LeftContent>

      {isAuth && (
        <Logout onClick={handleLogout}>
          <div>
            <FiLogOut size={22} />
          </div>
        </Logout>
      )}
    </Container>
  )
}

const LeftContent = styled.div`
  display: flex;
`

const Logout = styled.div`
  color: white;
  padding-right: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    cursor: pointer;
    :hover {
      color: #688eff;
    }
  }
`
const Title = styled.h1`
  align-self: center;
  color: #ececec;
  font-size: 1.5rem;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: #282c34ff;
`

export default TopNavigator
