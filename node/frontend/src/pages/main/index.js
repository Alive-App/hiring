import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { GlobalContext } from '../../providers/globalState';
// import axios from 'axios';
import {
  Container, SerchContainer, GeneralContainer, ButtonsContainer, SearchButton,
} from './styles';
import api from '../../services/api';
import empty from '../../assets/img/search.svg';
import notify from '../../utils/notification';

export default function Main() {
  const [quote, setQuote] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [inWallet, setInWallet] = useState('');
  const [loading, setLoading] = useState(false);

  const { addStock } = useContext(GlobalContext);

  // const [results, setResults] = useState([]);

  // function search() {
  //   axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchedStock}&apikey=A15TFI52OO3BO9KP`).then((response) => {
  //     if (response.data.bestMatches) {
  //       setResults(response.data.bestMatches);
  //     } else {
  //       setResults([]);
  //     }
  //   });
  // }

  async function getQuote(e) {
    e.preventDefault();
    setLoading(true);
    api.get(`/stocks/${selectedSymbol}/quote`).then((response) => {
      setQuote(response.data);
    }).catch((err) => {
      notify(err.response.data.error, 'error');
    });
    setInWallet(false);
    setLoading(false);
  }

  return (
    <Container>
      <SerchContainer>
        <h1>Pesquise um ativo</h1>
        <form onSubmit={getQuote}>
          <input required placeholder="IBM" value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} />
          <SearchButton type="submit" loading={loading}>
            {loading ? <FaSpinner /> : <FaSearch />}
          </SearchButton>
        </form>
        {/* { searching
          ? results.map((result) => (
            <div>
              <button type="button" onClick={() => selectResult(result['1. symbol'])}>
                {' '}
                {result['1. symbol']}
              </button>
            </div>
          )) : null} */}
      </SerchContainer>
      <GeneralContainer>
        {
        quote !== ''
          ? (
            <>
              <button type="button" onClick={() => [addStock(quote), setInWallet(true), notify('Adicionado com sucesso', 'sucess')]}>
                { inWallet
                  ? null
                  : ' ADICIONAR A CARTEIRA'}
              </button>
              <h1>{quote.name}</h1>
              <div>
                <strong>{`Preço atual: ${quote.lastPrice}`}</strong>
                <p>{`atualizado em: ${`${new Date(quote.pricedAt).getDate()}/${new Date(quote.pricedAt).getMonth() + 1}/${new Date(quote.pricedAt).getFullYear()}`}`}</p>
              </div>
              <ButtonsContainer>
                <Link to={`/compare/${quote.name}`}>
                  Comparar Ativos
                </Link>
                <Link to={`/history/${quote.name}`}>
                  Analisar histórico
                </Link>
                <Link to={`/gain/${quote.name}`}>
                  Projetar Ganhos
                </Link>
              </ButtonsContainer>
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
