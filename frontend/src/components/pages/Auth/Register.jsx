import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="flex h-screen w-full bg-[url('./assets/black-brick-wall-textured-background.jpg')] bg-cover justify-center items-center">
      <div className='flex flex-col border-purple-800 border-solid border-2 px-20 pt-10 pb-15 bg-black/70 w-120'>
        <h1 className='text-white text-2xl self-center mb-7 uppercase'>Cadastro</h1>
        <label htmlFor='nome' className='text-white py-1 uppercase'>Nome</label>
        <input type='text' name='nome' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome" required />
        <label htmlFor='email' className='text-white py-1 uppercase'>Email</label>
        <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
        <label htmlFor='senha' className='text-white py-1 uppercase'>Senha</label>
        <input type="password" name="senha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Senha" required />
        <label htmlFor="RepSenha" className='text-white py-1 uppercase'>Repita a senha</label>
        <input type="password" name="RepSenha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Senha" required />
        <div className='flex flex-col items-end'>
          <p className='text-white py-1 underline uppercase'><Link to="/login">Já possui conta? Entre</Link></p>
          <button className='bg-purple-700 text-white py-2 px-4 cursor-pointer uppercase hover:bg-purple-900'>Registrar</button>
        </div>
      </div>
    </div>
  )
}

export default Register