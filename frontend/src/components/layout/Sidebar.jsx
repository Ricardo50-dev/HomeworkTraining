import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Remover tokens ou sessão salva
        localStorage.removeItem('token'); // ou sessionStorage.clear()
        sessionStorage.clear();

        // 2. (Opcional) Atualizar contexto global de autenticação, se estiver usando Context API
        // authContext.setUser(null);

        // 3. Redirecionar para tela de login
        navigate('/login');
    };

    return (
        <div className="fixed h-screen bg-purple-600 pt-[0.5rem] pr-[1rem] z-100 transition-[0.5s] top-0 w-[68px] md:pr-[1rem] md:pt-[1rem] md:left-0" id="nav-bar">
            <nav className="flex flex-col overflow-hidden justify-between h-full">
                <div>
                    <Link to="/home" className='grid grid-cols-[max-content_max-content] items-center gap-x-[1rem] py-[0.5rem] pl-[1.5rem] mb-[2rem]'>
                        <i className='bx bx-home text-[1.25rem] text-white'></i>
                        <span className="text-white font-bold">Homework Train</span>
                    </Link>
                    <div>
                        <Link to="/treino" className="grid grid-cols-[max-content_max-content] items-center gap-x-[1rem] py-[0.5rem] pl-[1.5rem] relative text-gray-300 mb-[1.5rem] transition-[0.3s] hover:text-white">
                            <i className='bx bx-dumbbell text-[1.25rem]'></i>
                            <span className="nav_name">Treinos</span>
                        </Link>
                        <Link to="/dieta" className="grid grid-cols-[max-content_max-content] items-center gap-x-[1rem] py-[0.5rem] pl-[1.5rem] relative text-gray-300 mb-[1.5rem] transition-[0.3s] hover:text-white">
                            <i className='bx bx-bowl-rice text-[1.25rem]'></i>
                            <span className="nav_name">Dietas</span>
                        </Link>
                        <Link to="/gerenciador" className="grid grid-cols-[max-content_max-content] items-center gap-x-[1rem] py-[0.5rem] pl-[1.5rem] relative text-gray-300 mb-[1.5rem] transition-[0.3s] hover:text-white">
                            <i className='bx bx-bar-chart-alt-2 text-[1.25rem]'></i>
                            <span className="nav_name">Gerenciador</span>
                        </Link>
                        <Link to="/editaPerfil" className="grid grid-cols-[max-content_max-content] items-center gap-x-[1rem] py-[0.5rem] pl-[1.5rem] relative text-gray-300 mb-[1.5rem] transition-[0.3s] hover:text-white">
                            <i className='bx bx-user text-[1.25rem]'></i>
                            <span className="nav_name">Edita Perfil</span>
                        </Link>
                    </div>
                </div>
                <a onClick={handleLogout} className="grid grid-cols-[max-content_max-content] items-center gap-x-[1rem] py-[0.5rem] pl-[1.5rem] relative text-gray-300 mb-[1.5rem] transition-[0.3s] hover:text-white">
                    <i className='bx bx-log-out text-[1.25rem]'></i>
                    <span className="nav_name">Sair</span>
                </a>
            </nav>
        </div>
    )
}

export default Sidebar