import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 2px;
  background-color: #ee4d2d;
  border: 0;
  color: #fff;
  padding: 1px 6px;
  transition: 0.2s background ease;
  &:hover {
    background: #f05d40;
  }

  ${({ light }) => {
    if (light) {
      return `
      background-color: #fff;
      border: 1px solid rgba(0,0,0,.09);
      color: #555;
      box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
      &:hover {
        background: rgba(0,0,0,.02)
      }
      `
    }
  }}
`

export const ButtonLink = styled(Link)`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: #ee4d2d;
  border-radius: 2px;
  border: 0;
  color: #fff;
  padding: 1px 6px;
  transition: 0.2s background ease;
  &:hover {
    background: linear-gradient(
      to top,
      rgba(252, 149, 70, 1) 35%,
      rgba(254, 214, 119, 1) 100%
    );
  }

  ${({ light }) => {
    if (light) {
      return `
      background-color: #fff;
      border: 1px solid rgba(0,0,0,.09);
      color: #555;
      box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
      &:hover {
        background: rgba(0,0,0,.02)
      }
      `
    }
  }}
`

export const CustomCheckbox = styled.li`
  display: flex;
  justify-content: center;
  cursor: pointer;
  input {
    display: none;
  }
  input:checked + .product-checkbox__style {
    background: linear-gradient(
      to top,
      rgba(167, 142, 255, 1),
      rgba(167, 142, 255, 0.5)
    );
    i {
      display: block;
    }
  }
`
