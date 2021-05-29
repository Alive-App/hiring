import styled, { css, keyframes } from 'styled-components'
import { darken } from 'polished'

export interface IButton {
  bg?: string
  color?: string
  width?: string
  height?: string
  loading?: string
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Button = styled.button<IButton>`
  background: ${(props) => props.background || '#3861fb'};
  color: ${(props) => props.color || '#fff'};
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, width 0.5s;
  font-size: 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};

  svg {
    margin-right: 6px;
    font-size: 1.8rem;
  }

  &:hover {
    background: ${(props) => darken(0.05, props.background || '#3861fb')};
  }

  ${(props) =>
    props.loading &&
    css`
      width: 60px;

      &:hover {
        background: ${(props) => props.background || '#3861fb'};
      }

      svg {
        animation: ${rotate} 1s linear infinite;
      }
    `}
`
