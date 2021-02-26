/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import api from '../../services/api';
import empty from '../../assets/img/search.svg';
import {
  Container, GeneralContainer,
} from './styles';
import notify from '../../utils/notification';

export default function Compare({ match }) {
  const { stock } = match.params;
  const [stocks, setStocks] = useState([]);
  const [results, setResults] = useState([]);

  async function getCompare(e) {
    e.preventDefault();
    const data = stocks.split(',');
    api.post(`http://localhost:3333/stocks/${stock}/compare`, {
      stocks: data,
    }).then((response) => {
      setResults(response.data);
    }).catch((err) => {
      notify(err.response.data.error, 'error');
    });
  }

  return (
    <Container>
      <h1>
        Compare outras ações com
        {' '}
        {stock}
      </h1>
      <form onSubmit={getCompare}>
        <input placeholder="IBM,TESCO,PETRA" value={stocks} onChange={(e) => setStocks(e.target.value)} />
        <button type="submit">Comparar</button>
      </form>
      <GeneralContainer>
        {
          results.length !== 0
            ? (
              <>
                {
                  results.map((result) => (
                    <div>
                      <strong>{result.name ? result.name : result.error}</strong>
                      <strong>{result.lastPrice ? `Preço atual: ${result.lastPrice}` : null}</strong>
                      <p>{result.pricedAt ? `atualizado em: ${`${new Date(result.pricedAt).getDate()}/${new Date(result.pricedAt).getMonth() + 1}/${new Date(result.pricedAt).getFullYear()}`}` : null}</p>
                    </div>
                  ))
                }
              </>
            )
            : (
              <>
                <h1>Aguardando dados...</h1>
                <img src={empty} alt="search" />
              </>
            )
        }
      </GeneralContainer>
    </Container>

  );
}
