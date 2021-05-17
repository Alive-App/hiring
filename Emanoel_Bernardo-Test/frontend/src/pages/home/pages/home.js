import React, {useState, useEffect} from 'react';
import '../styles.css'
import axios from 'axios'
import Search from '../../../assets/search.svg'
import api from '../../../services/api'
// import { Container } from './styles';

function Home() {

  const [stocks, setStocks] = useState([])
  const [stock, setStock] = useState(false)
  const [value, setValue] = useState(1)


  function getStocks(query){
      axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=5XRW8LUSCPCIB6T7`)
          .then( res => {
              setStocks(res.data.bestMatches)
          })
  }

  async function getStock(stockName){
      await api.get(`/stocks/${stockName}/quote`).then(res => {
          setStock(res.data)
          setStocks([])
      }).catch(e => {
          console.log(e.response)
      })
  }

  async function createStock(){
      const userId = await localStorage.getItem('user')
    await api.post(`/stocks` , {
        stockName: stock.name,
        amount: value
    }, {
        headers: {
            user_id: userId
        }
    }).then(res => {
        setStock(false)
        window.location.reload()
    }).catch(e => {
        console.log(e.response)
    })
  }

  return (
    <div>
      <div className='search-container' onClick={() => setStocks([])}>
                    <input type="text" placeholder='Pesquisar ações' className='search-box' onChange={ e => {
                        if(e.target.value === undefined) return false
                        if(e.target.value.length <= 1) setStocks([])
                        if(e.target.value.length > 0) getStocks(e.target.value)
                    }}
                   
                    />
                    <img src={Search} alt="search"  width='20' height='20' className='icon-search'/>
                </div>
                {
                    stocks.length>0?  
                    <div className="search-content">
                        <ul>
                            {
                                stocks.map( stock => {
                                    return (
                                    <li onClick={() => getStock(stock['1. symbol'])}><p className='symbol'>{stock['1. symbol']}</p><p>{stock['2. name']}</p></li>
                                )})
                            }
                        </ul>
                    </div>
                :false
                }
                {
                    stock? 
                    <div className="stock">
                    <strong className='symbol'>{stock.name}</strong>
                    <p className='date'>Preço da ação em {stock.priceAt}: <strong>{parseFloat(stock.price).toFixed(2)}</strong></p>
                    <p>Comprar ações:</p>
                    <p className='buy'>
                        <input type="number" min='1' value={value} onChange={ e => setValue(e.target.value)}/>
                        <p>total: {(parseFloat(stock.price)*value).toFixed(2)}</p>
                    </p>
                    <button onClick={createStock}>Adicionar</button>
                    </div>
                   
                   : false
                }
    </div>
  );
}

export default Home;