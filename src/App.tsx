import React from 'react'
import GlobalStyle from 'Constants/GlobalStyle'
import TopNavigator from 'Components/TopNavigator/TopNavigator'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import Login from 'Components/Login/Login'
import CommentList from 'Pages/CommentList'

const App = () => {
  const { isAuth } = useSelector((state: RootState) => state.UserStore)

  return (
    <>
      <GlobalStyle />
      <TopNavigator />
      );
      {isAuth ? <CommentList /> : <Login />}
    </>
  )
}

export default App
