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

export const TableContainer = styled.div`
  background: #fff;
  margin-top: 2rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    tr {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    th {
      text-align: left;
      padding: 2rem;
      font-size: 1.6rem;
    }
  }

  tbody {
    tr:nth-child(odd) {
      background: rgba(0, 0, 0, 0.03);
    }

    td {
      padding: 1rem 2rem;
    }
  }
`
