import './App.css'
import GetProduct from './components/GetProduct'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='h-full bg-slate-800'>
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 bg-black">
        <Navbar />
      </div>
      <div className='mt-[80px] h-auto flex items-center justify-center min-h-screen'>
        <GetProduct />
      </div>
    </div >
  )
}

export default App
