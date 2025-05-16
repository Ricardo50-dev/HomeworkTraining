import { useState, useEffect, useRef } from 'react'
import api from '../../utils/api'

const Navbar = () => {
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    // Referências para elementos do próprio módulo
    const toggleRef = useRef(null)
    const headerRef = useRef(null)

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

    useEffect(() => {
        const toggle = toggleRef.current
        const header = headerRef.current
        const nav = document.getElementById('nav-bar') // vem de outro módulo
        const body = document.getElementById('body-pd') // vem do index.html
        const footer = document.getElementById('footer')

        if (toggle && header && nav && body && footer) {
            const handleToggle = () => {
                nav.classList.toggle('show')
                toggle.classList.toggle('bx-x')
                body.classList.toggle('body-pd')
                header.classList.toggle('body-pd')
                footer.classList.toggle('show-footer')
            }

            toggle.addEventListener('click', handleToggle)

            // Cleanup
            return () => {
                toggle.removeEventListener('click', handleToggle)
            }
        }
    }, [])

    return (
        <header ref={headerRef} className="w-full h-[3rem] fixed top-0 left-0 flex items-center justify-between px-[1rem] bg-gray-200 z-100 transition-[0.5s] md:h-[calc(var(3rem)_+_1rem)] md:pl-[6.25rem] md:pr-[2rem]" id="header">
            <div className="text-purple-600 cursor-pointer text-[1.5rem] flex items-center">
                <i className='bx bx-menu' id="header-toggle" ref={toggleRef}></i>
            </div>
            <div>
                <p> Seja bem vindo {user.nome}! Bora treinar?</p>
            </div>
        </header>
    )
}

export default Navbar