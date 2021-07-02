import React from 'react'
import styled from 'styled-components'

type PropsType = {
  text: string
  action: () => void
}
const Button = ({ text, action }: PropsType) => {
  return <ButtonBox onClick={action}>{text}</ButtonBox>
}

const ButtonBox = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.75;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 16px;
  transition: all 0.2s ease-in-out;
  color: rgb(255, 255, 255);
  background-color: rgb(104, 142, 255);
  box-shadow: rgb(0 0 0 / 70%) 0 0 1px 0, rgb(0 0 0 / 50%) 0 2px 2px -2px;
  width: 100%;
  text-transform: none;
  :hover {
    transform: scale(1.005);
  }
`

export default Button
