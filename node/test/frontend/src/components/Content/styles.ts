import styled from 'styled-components'

export interface IContent {
  direction?: 'row' | 'column'
  align?: 'center' | 'flex-start'
  justify?: 'center' | 'flex-start' | 'space-between'
}

export const Container = styled.div<IContent>`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  width: 100%;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`
