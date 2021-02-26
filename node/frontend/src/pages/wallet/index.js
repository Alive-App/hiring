import React, { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { GlobalContext } from '../../providers/globalState';
import {
  Wrapper,
  ListContainer,
  ListItem,
  IconsContainer,
  RigthSideContainer,
} from './styles';
import Empty from '../../assets/img/search.svg';

export default function Wallet() {
  const { stocks, removeStock } = useContext(GlobalContext);

  return (
    <>
      <Wrapper>
        <h1>Seus Ativos</h1>
        <ListContainer>
          {stocks.length === 0 ? (
            <>
              <img src={Empty} alt="empty" />
              <p>Carteira vazia :(</p>
            </>
          ) : stocks.map((stock) => (
            <ListItem key={stock.name}>
              <RigthSideContainer>
                <div>
                  <strong>{stock.name}</strong>
                </div>
                <IconsContainer>
                  <button type="button" onClick={() => removeStock(stock.symbol)}>
                    <MdDelete color="#DC3B45" size={32} />
                  </button>
                </IconsContainer>
              </RigthSideContainer>
            </ListItem>
          ))}
        </ListContainer>
      </Wrapper>
    </>
  );
}
