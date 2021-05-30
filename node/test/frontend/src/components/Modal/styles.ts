import styled, { css } from 'styled-components'

export interface IModalContainer {
  active?: boolean
}

export const Container = styled.div<IModalContainer>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  display: flex;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  padding: 0 2rem;
  z-index: 10;

  ${(props) =>
    props.active &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`

export const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  z-index: 10;
`

export const Content = styled.div`
  position: relative;

  max-width: 500px;
  width: 100%;
  z-index: 20;
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;

  small {
    font-size: 12px;
    display: block;
    color: #808a9d;
  }

  .close {
    position: absolute;
    right: 2rem;
    top: 1.5rem;
    font-size: 2.5rem;
    background: transparent;
    border: none;
    color: #808a9d;
    cursor: pointer;
  }

  .header,
  .body {
    padding: 1.5rem 2rem;
  }

  .header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 1.8rem;
    }
  }

  .body {
    .form-error {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    input {
      text-transform: uppercase;

      &::placeholder {
        text-transform: initial;
      }
    }

    button {
      margin-top: 2rem;
    }
  }
`
