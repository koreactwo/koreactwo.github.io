// import { useState } from 'react'
import  TodoList from './pages/TodoList.tsx';
import { HomeMark, BarsMark} from "./Icons";
import "./App.css";

function App() {

  return (
    <>
    <div className=''> {/* root  */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <button className="sixtick-btn">
            <HomeMark/>
          </button>
        </div>
        <div className="flex-1">
          <p className="ml-4 text-xl font-bold">SIXTICK</p>
        </div>
        <div className="flex-none">
          <button className="sixtick-btn">
            <BarsMark/>
          </button>
        </div>
      </div>

      {/* contents */}
      <div className='mx-auto max-w-160 w-full'>
        <TodoList className=''/>
      </div>
      

    </div>
    </>
  )
}

export default App
