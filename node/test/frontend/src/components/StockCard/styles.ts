import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;

  width: 100%;
  min-height: 280px;
  position: relative;

  span {
    display: block;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #808a9d;
  }

  h2,
  time {
    font-size: 2rem;
    font-weight: 600;
  }

  div {
    padding: 1rem;
  }

  .price {
    padding: 2.5rem 1rem;
    background: #3861fb;
    color: #fff;

    span {
      color: rgba(255, 255, 255, 0.7);
    }

    strong {
      font-size: 4rem;
    }
  }

  a {
    color: #fff;
    font-size: 2rem;

    position: absolute;
    top: 1rem;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    &.compare {
      right: 1rem;
    }

    &.history {
      left: 1rem;
    }
  }
`
