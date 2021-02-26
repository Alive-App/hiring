/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import api from '../../services/api';
import empty from '../../assets/img/search.svg';
import {
  Container, GeneralContainer,
} from './styles';
import notify from '../../utils/notification';

export default function History({ match }) {
  const { stock } = match.params;
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [results, setResults] = useState([]);

  async function getCompare(e) {
    e.preventDefault();
    api.get(`http://localhost:3333/stocks/${stock}/history?from=${from}&to=${to}`).then((response) => {
      setResults(response.data);
    }).catch((err) => {
      notify(err.response.data.error, 'error');
    });
  }

  return (
    <Container>
      <h1>
        Pesquise a série histórica de
        {' '}
        {stock}
      </h1>
      <form on onSubmit={getCompare}>
        <p>DE</p>
        <input required type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <p>Até</p>
        <input required type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <button type="submit">Historia</button>
      </form>
      <GeneralContainer>

        {
          results.name
            ? (
              <>
                <div>
                  <h1>{results.name}</h1>
                  {
                results.prices.map((result) => (
                  <>
                    <p>{`Dia: ${`${new Date(result.pricedAt).getDate()}/${new Date(result.pricedAt).getMonth() + 1}/${new Date(result.pricedAt).getFullYear()}`}`}</p>
                    <strong>{`Abertura: ${result.opening}`}</strong>
                    <strong>{`Fechamento: ${result.closing}`}</strong>
                    <strong>{`MAx: ${result.high}`}</strong>
                    <strong>{`Min: ${result.low}`}</strong>
                  </>
                ))
                    }
                </div>
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
