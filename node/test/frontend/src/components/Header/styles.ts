import styled from 'styled-components'

export const Container = styled.header`
  background: #fff;
  height: 8rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 2rem;
    font-weight: 400;

    a {
      text-decoration: none;
      color: inherit;
    }

    strong {
      font-weight: 600;
    }
  }
`
