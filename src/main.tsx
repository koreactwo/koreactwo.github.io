import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'; // 라우터 컨텍스트 지정
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!,{
  // 이 위치에서 에러를 캐치 할 수 있다
}).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
