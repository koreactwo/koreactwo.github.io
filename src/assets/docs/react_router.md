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