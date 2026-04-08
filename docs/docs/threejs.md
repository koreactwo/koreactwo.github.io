# Three.js

## 설치 
```
bun install three @types/three @react-three/fiber @react-three/drei @react-three/cannon
```
- three @types/three : 자바스크립트 3D 라이브러리
- @react-three/fiber : Three.js 를 리액트 컴포넌트방식으로 쓸수있게 해주는 래퍼(인터페이스)
- @react-three/drei : R3F를 쓸 때 자주 사용하는 기능을 미리 만들어둔 유틸리티 라이브러리
- @react-three/cannon : 물리 법칙 적용

## 빈 캔버스 예시
```
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Grid, Plane } from '@react-three/drei'

export default function Rect3D() {
  const [w] = useState(10);
  const [h] = useState(10);
  return (
    <div className='flex flex-col lg:flex-row w-full h-screen'>
      
        {/* style={{ width: '100vw', height: '100vh', background: '#111' }} */}
        <div className='flex-1 relative bg-neutral min-w-0 min-h-0'>
          <Canvas
            camera={{ position: [10, 10, 10], fov: 50 }} // 카메라 초기 위치와 화각
          >
            {/* 1. 배경 및 보조 도구 */}
            <color attach="background" args={['#1a1a1a']} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Grid infiniteGrid sectionSize={1} cellSize={0.5} sectionColor="#880" cellColor="#888" />

            {/* 2. 조명 세팅 (랙의 질감을 살려줄 기본 광원) */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* 3. 컨트롤러 (마우스로 화면 돌리기 가능) */}
            <OrbitControls makeDefault  />
            {/* enablePan={false} */}

            {/* 여기에 나중에 <Rack /> 컴포넌트가 들어갈 겁니다 */}
            <Plane
              args={[w, h]} // 가로 20m, 세로 20m (약 120평 규모)
              rotation={[-Math.PI / 2, 0, 0]} // 바닥처럼 눕히기 (90도 회전)
              position={[0, 0, 0]}
            >
              <meshStandardMaterial color="lightgreen" /> {/* 어두운 회색 콘크리트 느낌 */}
            </Plane>
          </Canvas>
        </div>
      


      <div className='h-100 lg:w-100 '>
        ui
      </div>


    </div>
  )
}

```