import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!,{
  // 여기서 에러를 캐치 할 수 있다
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
