import { useState, useEffect } from 'react'
import api from '../../utils/api'

const Navbar = () => {
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api
            .get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setUser(response.data)
            })
    }, [token])

    return (
        <header className="w-full h-[3rem] fixed top-0 left-0 flex items-center justify-between px-[1rem] bg-gray-200 z-100 transition-[0.5s] md:h-[calc(var(3rem)_+_1rem)] md:pl-[6.25rem] md:pr-[2rem]" id="header">
            <div className="text-purple-600 cursor-pointer text-[1.5rem] flex items-center">
                <i className='bx bx-menu' id="header-toggle"></i>
            </div>
            <div>
                <p> Seja bem vindo {user.nome}! Bora treinar?</p>
            </div>
        </header>
    )
}

export default Navbar