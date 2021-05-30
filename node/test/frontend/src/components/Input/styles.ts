import styled from 'styled-components'

export const Container = styled.div`
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #808a9d;
  }

  input {
    width: 100%;
    display: block;
    border-radius: 0.6rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    padding: 1rem;
    outline: none;
    transition: border-color 0.2s;
    font-size: 1.6rem;
    height: 5rem;

    &:focus {
      border-color: #3861fb;
    }
  }
`
