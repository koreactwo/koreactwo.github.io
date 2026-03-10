import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    // 빌드 결과물이 생성될 디렉터리 지정
    outDir: 'docs',
    // 기존 docs 디렉터리가 있다면 삭제 후 재생성 (기본값 true)
    emptyOutDir: true,
  },
})
