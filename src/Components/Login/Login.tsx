import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'Components/Button/Button'
import { useDispatch } from 'react-redux'
import { setUser } from 'Store/UserStore'
import { ClipLoader } from 'react-spinners'
import { css } from '@emotion/react'

const Login = () => {
  const [email, setEmail] = useState('Demo@demo.com')
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = () => {
    setLoading(true)
    if (email) {
      setTimeout(() => {
        setLoading(false)
        dispatch(setUser(email))
      }, 1000)
    }
  }

  const handleEmailChange = ({ target }) => setEmail(target.value)

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
        <LoginBox>
          <LoginContext>
            <Title>Login</Title>
            <P>Log in on the internal platform</P>
            <EmailAddress>
              <Input value={email} onChange={handleEmailChange} />
              <Field aria-hidden="true">
                <legend>
                  <Span>Email Address</Span>
                </legend>
              </Field>
            </EmailAddress>
            <Button text="Login" action={handleLogin} />
          </LoginContext>
        </LoginBox>
      )}
    </Container>
  )
}

export const ClipLoaderOverride = css`
  display: block;
  margin: 0 auto;
  border-color: #688eff;
`

const P = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  color: rgb(145, 158, 171);
`

const EmailAddress = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
  cursor: text;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  position: relative;
  border-radius: 16px;
`
const Span = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
`

const Field = styled.fieldset`
  text-align: left;
  position: absolute;
  inset: -5px 0 0;
  margin: 0;
  padding: 0 8px;
  pointer-events: none;
  border-radius: inherit;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  min-width: 0;
  outline: none;
  border-color: rgba(255, 255, 255, 0.23);
  :hover {
    border-color: rgba(163, 33, 255, 0.23);
  }
`

const Input = styled.input`
  :focus {
    outline: none;
  }
  font: inherit;
  letter-spacing: inherit;
  color: currentcolor;
  border: 0;
  box-sizing: content-box;
  background: none;
  height: 2.4375em;
  margin: 0;
  display: block;
  min-width: 0;
  width: 100%;
  animation-name: mui-auto-fill-cancel;
  animation-duration: 10ms;
  padding: 16.5px 14px;
`

const Title = styled.h2`
  color: #e8e8e8;
  margin: 0;
  padding: 0;
`
const LoginContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #d7d7d7;
  padding: 32px;
  height: 85%;
`
const LoginBox = styled.div`
  background-color: #222b36;
  height: 350px;
  width: 90%;
  color: rgb(255, 255, 255);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 13%) -4px 10px 19px 0px,
    rgb(0 0 0 / 50%) 0px 3px 4px -2px;
  background-image: none;
  overflow: hidden;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  height: calc(100vh - 70px);
  @media (min-width: 768px) {
    width: 680px;
  }
`

export default Login
