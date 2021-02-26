/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import api from '../../services/api';
import empty from '../../assets/img/search.svg';
import {
  Container, GeneralContainer,
} from './styles';
import notify from '../../utils/notification';

export default function Gain({ match }) {
  const { stock } = match.params;
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [purchasedAt, setPurchasedAt] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [result, setResult] = useState('');

  async function getCompare(e) {
    e.preventDefault();
    api.get(`http://localhost:3333/stocks/${stock}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}&finalDate=${finalDate}`).then((response) => {
      setResult(response.data);
    }).catch((err) => {
      notify(err.response.data.error, 'error');
    });
  }

  return (
    <Container>
      <h1>
        Projete os ganhos sobre
        {' '}
        {stock}
      </h1>
      <form onSubmit={getCompare}>
        <p>Data de compra</p>
        <input type="date" required value={purchasedAt} onChange={(e) => setPurchasedAt(e.target.value)} />
        <p>Data final</p>
        <input type="date" value={finalDate} onChange={(e) => setFinalDate(e.target.value)} />
        <p>Quantide de ativos</p>
        <input type="number" required value={purchasedAmount} onChange={(e) => setPurchasedAmount(e.target.value)} />
        <button type="submit">Projetar</button>
      </form>
      <GeneralContainer>

        {
          result !== ''
            ? (
              <>
                <div>
                  <h2>{result.name}</h2>
                  <strong>{`se você tivesse: ${result.purchasedAmount} unidades`}</strong>
                  <strong>{`compradas a: R$ ${result.purchasePriceAtDate}`}</strong>
                  <strong>{`de: ${`${new Date(result.purchasedAt).getDate()}/${new Date(result.purchasedAt).getMonth() + 1}/${new Date(result.purchasedAt).getFullYear()}`} até ${`${new Date(result.finalDate).getDate()}/${new Date(result.finalDate).getMonth() + 1}/${new Date(result.finalDate).getFullYear()}`}`}</strong>
                  <strong>{`seu lucro/prejuízo seria de: ${result.capitalGains}`}</strong>
                  <strong>{`o valor final de cada uma seria: R$ ${result.priceAtFinalDate}`}</strong>
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
