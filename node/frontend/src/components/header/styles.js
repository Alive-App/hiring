import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 16px 0 40px 0;

  img {
    width: 50px;
    height: 30px;
  }
  a {
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Logout = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  background-color:none;
  background:none;
  border:none;
  &:hover {
    opacity: 0.7;
  }
  div {
    text-align: right;
    margin-right: 10px;
  }
  strong {
    display: block;
    color: #fff;
    margin-right:16px;
  }
  span {
    font-size: 12px;
    color: #999;
  }
`;
