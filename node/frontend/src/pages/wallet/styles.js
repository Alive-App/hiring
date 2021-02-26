import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 32px;
  > h1 {
    margin-bottom: 32px;
  }
  > a{
    text-decoration: none;
    color:inherit;
    align-self:flex-end;
    display:flex;
    align-items:center;
    @media (max-width: 768px) {
      align-self:center;
    }
  >button{
    background-color:#39823B;
    border:none;
    font-size:16px;
    font-weight:bold;
    padding:8px;
    border-radius:4px;
    &:hover {
    opacity: 0.7;
  }
  }
  }
`;
export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 90%;
  padding: 16px;
  >img{
    align-self:center;
    font-size:16px;
    width:30%;
    margin-top:40px;
  }
  >p{
    align-self:center;
    font-size:16px;
    margin:8px;
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  justify-content: space-evenly;
  color: #191920;
  border: solid 1px #999;
  margin: 8px 0;
  padding: 8px;
  background-color: #ffffff;
  > img {
    width: 50px;
    height: 50px;
    margin: 0 16px;
    border-radius:8px;
  }
`;
export const RigthSideContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  >button{
    background:none;
    margin: 0 8px;
    border:none;
    transition: opacity 0.2s;
    &:hover {
    opacity: 0.7;
  }
  }
`;
