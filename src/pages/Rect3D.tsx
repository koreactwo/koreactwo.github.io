import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Grid, Plane } from '@react-three/drei'

export default function Rect3D() {
  // const [w] = useState(10);
  // const [h] = useState(10);
  const [cell, setCell] = useState(10);

  const handleCell = (e : React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    // console.log(e.currentTarget.validity.valid);
    if (e.currentTarget.validity.valid){
      setCell(Number(e.currentTarget.value));
    }
  }
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

          {/* 2. 태양광 같은 직사광선 (그림자와 각도를 만들어줌) */}
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={0.5} 
            castShadow // 그림자 활성화
            shadow-mapSize={[1024, 1024]} // 그림자 품질
          />

          {/* 3. 보조광 (어두운 부분을 살짝 밝혀줌) 안먹는것 같은데?? */}
          <pointLight position={[10, 10, 10]} intensity={1} color="#444"/>

          {/* 3. 컨트롤러 (마우스로 화면 돌리기 가능) */}
          <OrbitControls makeDefault />
          {/* enablePan={false} */}

          {/* 여기에 나중에 <Rack /> 컴포넌트가 들어갈 겁니다 */}
          <Plane
            args={[cell, cell]} // 척도 개념을 도입해야함 . 
            rotation={[-Math.PI / 2, 0, 0]} // 바닥처럼 눕히기 (90도 회전)
            position={[0, -0.001, 0]}
          >
            <meshStandardMaterial color="lightgreen" />
          </Plane>

          {/* 4. 직사각형 박스 (랙 예시) */}
          <mesh position={[0, 2.25, 0]}>
            {/* args: [가로(x), 높이(y), 깊이(z)] -> 2.5m x 4.5m x 1.2m */}
            <boxGeometry args={[2.5, 4.5, 1.2]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </Canvas>
      </div>
    
      

      <div className='h-100 lg:w-100 '>
        <h3 className='text-center'>바닥 설정</h3>
        <div className='grid grid-cols-2 items-center justify-center px-2 pt-1'>
          <label className='text-center'>가로 (단위 M) : </label>
          <input type='number' value={100} className='input'/>
        </div>
        <div  className='grid grid-cols-2 items-center justify-center px-2 pt-1'>
          <label className='text-center'>세로 (단위 M) : </label>
          <input type='number' value={100} className='input'/>
        </div>
        <div className='grid grid-cols-2 items-center justify-center px-2 pt-1'>
          <label className='text-center'>비율 (가로기준) : </label>
          <input type='number' onChange={handleCell} className='input validator' min='10' max='100' step={1} defaultValue={10}/>
          <p className="validator-hint">Must be between be 10 to 100</p>

        </div>
        
      </div>


    </div>
  )
}