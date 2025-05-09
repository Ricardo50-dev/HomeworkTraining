import React from 'react'

const Register = () => {
  return (
    <div className='flex h-screen w-full bg-gray-500 justify-center items-center'>
        <div className='flex flex-col border-purple-800 border-solid border-3 p-20 bg-black'>
            <label htmlFor='nome' className='text-white'>Nome</label>
            <input type='text' name='nome'/>
            <label htmlFor='email' className='text-white'>Email</label>
            <input type="email" name="email" />
            <label htmlFor='senha' className='text-white'>Senha</label>
            <input type="password" name="senha" />
            <label htmlFor="RepSenha" className='text-white'>Repita a senha</label>
            <input type="password" name="RepSenha" />
        </div>
    </div>
  )
}

export default Register