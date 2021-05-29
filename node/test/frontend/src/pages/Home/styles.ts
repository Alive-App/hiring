import styled from 'styled-components'

export const Container = styled.div`
  padding: 4rem 0;
  width: 100%;

  > h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .stock-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    width: 100%;
  }
`
