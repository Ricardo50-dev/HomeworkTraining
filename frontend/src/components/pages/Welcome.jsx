const Welcome = () => {
  return (
    <>
      <header className="flex flex-row justify-between w-full fixed shadow-sm shadow-slate-900/20 shadow-b-2 -shadow-spread-2 left-0 top-0 py-5 px-25">
          <a className="cursor-pointer flex items-center">
            <i className="bx bx-dumbbell"></i>
            <span className="font-bold">Homework Training</span>
          </a>
          <div>
            <a className="mr-4 cursor-pointer">Login</a>
            <a className="bg-purple-700 py-2 px-3 border-0 rounded-md text-white cursor-pointer hover:bg-purple-900">Cadastre-se</a>
          </div>
      </header>
      <div className="bg-purple-400 w-full py-5 left-0 absolute">

      </div>
      <footer>

      </footer>
    </>
  )
}

export default Welcome