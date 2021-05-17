import React, {useState, useEffect} from 'react'
import './styles.css'
import api from '../../services/api'


export default function Login({history}) {

    const [selected, setSelected] = useState('login')
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(){
        await api.post('/login', {
            email,
            password
        }).then(async(res)=> {
           await localStorage.setItem('user', res.data.userId)
           history.push('/')
        }
        ).catch(e=> {
            setError(e.response.status)
        })
    }

    async function register(){
        await api.post('/user', {
            email,
            password
        }).then(async(res)=> {
           await localStorage.setItem('user', res.data.userId)
           history.push('/')
        }
        ).catch(e=> {
            console.log(e)
        })
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) history.push('/')
    }, [])

    
    return (
        <div className='container-login'>
            <div className='form'>
                <nav className='navigation-bar'>
                    <ul>
                        <li className={selected === 'login'? 'selected': ''} onClick={() => setSelected('login')}>Entrar</li>
                        <li className={selected === 'register'? 'selected': ''} onClick={() => setSelected('register')}>Registrar-se</li>
                    </ul>
                </nav>
                {
                    selected === 'login'?
                    <div className='form-data'>
                        <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder='Senha'value={password} onChange={e => setPassword(e.target.value)}/>
                        {
                            error === 400? <p>Usuário não cadastrado</p>: error === 401? <p>Senha incorreta</p> :false
                        }
                    <button type='submit' onClick={login}>Entrar</button>
                    </div>
                    :
                    <div className='form-data'>
                        <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
                        <input type="password" placeholder='Confirmar senha'/>
                        <button type='submit'  onClick={register}>Registrar-se</button>
                    </div>
                }
            </div>
        </div>
    )
}
