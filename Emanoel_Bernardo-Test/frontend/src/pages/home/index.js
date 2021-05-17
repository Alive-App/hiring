import React, {useState, useEffect} from 'react'
import Seta from '../../assets/seta.svg'
import './styles.css'
import api from '../../services/api'
import Routes from './routes'
import {Link} from 'react-router-dom'

export default function Home({ history }) {

    const [stocks, setStocks ] = useState([])

    async function getStocks(id){
        console.log(id)
        await api.get('/stocks', {
            headers: {
                user_id: id
            }
        }).then(res => {
            setStocks(res.data.stocks)
        })
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(!user) history.push('/login')
        else {
            getStocks(user)
        }
    }, [])


    return (
        <div className='container-home' >
            <aside className='navigation-container'>
                <Link to='/'>
                    <p className='logo'>StocksPlace</p>
                </Link>
                <nav>
                    <p className='title-nav'>Suas ações</p>

                    <ul>
                       {
                           stocks.map(stock => (
                               <Link to={`/stock/${stock.name}`}>
                                   <li className='item-nav'>{stock.name} <img src={Seta} alt="seta" /></li>
                               </Link>
                           ))
                       }
                    
                        
                    </ul>
                </nav>
            </aside>
            <div className='content'>
                <Routes />
            </div>
               
        </div>
    )
}
