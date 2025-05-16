// Components
import Sidebar from "../layout/Sidebar"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen">Home</div>
      <Footer />
    </>
  )
}

export default Home