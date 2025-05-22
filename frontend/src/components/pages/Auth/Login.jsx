import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../form/Input'

/* contexts */
import { Context } from '../../../context/UserContext'

const Login = () => {
    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(user)
    }
    return (
        <div className="h-screen w-full bg-[url('./assets/black-brick-wall-textured-background.jpg')] bg-cover fixed left-0 top-0">
            <div className="flex absolute bg-black/40 h-screen w-full justify-center items-center">
                <div className='flex flex-col border-purple-700 border-solid border-2 px-20 pt-10 pb-15 bg-black/40 w-120'>
                    <h1 className='text-white text-2xl self-center mb-7 uppercase'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            styleLabel="text-white py-1 uppercase"
                            styleInput="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="email"
                            text="Email"
                            name="email"
                            placeholder="Email"
                            handleOnChange={handleChange}
                            isRequired={true}
                        />
                        <Input
                            styleLabel="text-white py-1 uppercase"
                            styleInput="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            text="Senha"
                            name="password"
                            placeholder="Senha"
                            handleOnChange={handleChange}
                            isRequired={true}
                        />
                        <div className='flex flex-col items-end'>
                            <p className='text-white py-1 underline uppercase'><Link to="/register">Criar nova conta</Link></p>
                            <button type='submit'  value='Entrar' className='bg-purple-700 text-white py-2 px-4 cursor-pointer uppercase hover:bg-purple-900'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login