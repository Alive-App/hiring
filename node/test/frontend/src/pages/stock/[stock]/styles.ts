import styled from 'styled-components'

export const Form = styled.form`
  background: #fff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 1rem;

  > p {
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-body {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 3rem;
    margin-top: 2rem;
  }

  .form-error {
    background: #f9c8cb;
    padding: 1rem;
    font-size: 1.4rem;
    border-radius: 1rem;
    margin-top: 1rem;
  }

  button {
    align-self: flex-end;
    font-size: 1.6rem;
    height: 5rem;
  }

  @media (max-width: 768px) {
    .form-body {
      grid-template-columns: 1fr;
    }
  }
`

export const Gains = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  margin-top: 4rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;

  div {
    span {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #808a9d;
      display: block;
    }

    p {
      font-size: 2rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;

      svg {
        margin-right: 7px;
      }

      &.up {
        color: #16c784;
      }

      &.down {
        color: #ea3943;
      }
    }

    & + div {
      margin-top: 1.5rem;
    }
  }
`
