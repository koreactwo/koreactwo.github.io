import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-base-200 flex flex-col items-center'>
      <button className='btn bg-primary-content rounded-full hover:bg-secondary-content  ' 
        onClick={() => setCount(count + 1)} >test {count}</button>
    
    </div>
    </>
  )
}

export default App
