import React from 'react'
import styled from 'styled-components'
import AppLogo from '../Logo/Logo'

const TopNavigator = () => {
  return (
    <Container>
      <AppLogo />
      <Title>Post Application 2.0</Title>
    </Container>
  )
}

const Title = styled.h1`
  align-self: center;
  color: #ececec;
  font-size: 1.5rem;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: #282c34ff;
`

export default TopNavigator
