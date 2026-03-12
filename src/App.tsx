// import { useState } from 'react'
import  TodoList from './pages/TodoList.tsx';

function App() {

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <a href='' className="btn btn-square btn-ghost">
            <img src="/images/home.svg"/>
          </a>
        </div>
        <div className="flex-1">
          <p className="ml-4 text-xl font-bold">SIXTICK</p>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <img src = "/images/bars.svg"/>
          </button>
        </div>
      </div>

      <TodoList className='w-160 mx-auto'/>


    </>
  )
}

export default App
