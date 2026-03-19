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
- children : 컴포넌트, Outlet 으로 자식 컴포넌트를 렌더링할 수 있음. (부모, 자식 컴포넌트를 합치는 개념)
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

## 깃허브 404 에러대책

- GitHub Pages는 서버 설정을 직접 건드릴 수 없습니다. 그래서 두 가지 우회 방법을 씁니다.

    - 방법 A: 404.html 활용

    - public 폴더에 404.html 파일을 만들고, index.html의 내용을 그대로 복사해 넣습니다.

- 서버가 파일을 못 찾으면 404.html을 보여주는데, 이게 결국 리액트 앱이므로 라우팅이 동작합니다.

    - 방법 B: HashRouter 사용

    - 주소를 example.com/#/login 처럼 중간에 #을 넣는 방식입니다.

    - 브라우저는 # 뒤의 내용은 서버에 요청하지 않기 때문에 새로고침해도 404 에러가 절대 나지 않습니다. 가장 확실하지만 주소가 조금 지저분해집니다.


## useParams
- 동적 세그먼트
- 클라이언트용
```
<Route path='team/:id/group/:groupId' element={<Team />} />

'/team/1/group/2'

import { useParams } from 'react-router';

const params = useParams();

<h1>Team Id: {params.id}</h1>
<h1>Group Id: {params.groupId}</h1>


```
- 옵셔널 세그먼트
```
<Route path='team/:id/group?/:groupId?' element={<Team />} />

'/team/1/group/2' or '/team/1'

```