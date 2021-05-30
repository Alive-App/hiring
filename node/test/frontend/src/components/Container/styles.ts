import styled from 'styled-components'

export const Container = styled.div`
  padding: 4rem 0;
  width: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      h1 {
        font-size: 3rem;
      }

      p {
        color: #808a9d;
      }
    }

    &-info {
      text-align: right;

      strong {
        display: block;
        font-size: 3rem;
      }

      time {
        color: #808a9d;
      }
    }
  }
`
