import './App.css'
import GetProduct from './components/GetProduct'

function App() {

  return (
    <div className='h-full bg-slate-800'>
      <div className="h-[80px] md:pl-20 fixed inset-y-0 w-full z-50 bg-black">
           <p className=" text-white my-auto relative top-6 text-4xl font-bold ">
                Walmart Sprakathon
            </p>
      </div>
      <div className='mt-[80px] h-auto min-h-screen'>
        <GetProduct />
      </div>
    </div >
  )
}

export default App
