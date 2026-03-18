# React Router

## 리액트 라우터 설치하기
- 서드 파티 모듈임, 웹용 네이티브용 따로있음, 7버전에서 통합됨
```
npm install react-router

```


## Route 컴포넌트 주요 속성
- path : string, 경로지정
- element : 컴포넌트, 렌더링할 컴포넌트
- index : boolean, 부모 라우트의 기본 페이지 지정 여부
- children : 컴포넌트, 중첩 라우트를 정의할때 사용
- errorElement : 컴포넌트, 오류발생시 렌더링할 컴포넌트
- handle : object, 라우트에 메타데이터를 전달할 때 사용
- lazy : function, 동적임포트를 통해 코드 분할 구현

```
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/todolist' element={<TodoList className='mx-auto max-w-160 w-full h-full' />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}

```

## Outlet 컴포넌트
- Layout 컴포넌트 예시
```
import { Outlet } from "react-router";
// Outlet 위치에 path에 따라 Layout 자식 컴포넌트가 렌더링됨.
function Layout() {
    return (
        <Header/>
        <Outlet />
        <Footer/
    );
}

```