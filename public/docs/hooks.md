# React Hooks

## useState
- 기본적인 상태 관리

## useReducer
- 구조적인 상태 관리

## useRef
- DOM 연결

## useId 
- 리액트18에 도입됨
- 동일한 컴포넌트의 id 중복을 피하고 자동으로 id를 부여한다
```
const uuid = useId();
```

## useEffect 
- 렌더링 후 작동함.
- 마운트, 업데이트, 언마운트 시 후처리
```
useEffect(() => {'후처리'}, ['변경 감지 대상', ...]);
// 변경감지 대상에 [] 빈 배열을 쓰게 되면 처음 마운트시에만 동작하는데 이것보다는 상태관리에서 초기화 콜백(세번째인자)을 쓰는게 좋다. (개발환경에서 두번작동함. 오류의 소지가 있음. 또는 클린업과정에 안전한 코드를 작성한다)
// 두번째 인자를 쓰지 않으면 매번 리렌더링 될때마다 동작한다. 

useEffect(() => {'후처리'; return ()=>{'언마운트 후처리';};}, []);
// 후처리 다음에 콜백함수를 리턴하면 언마운트시에 동작한다. 

```

## useMemo
- 상태를 기억했다가 변경이 없으면 리렌더링하지 않음. 
- 메모이제이션 무효 상황 : 컴포넌트 자체의 상태가 변경된경우, 변경되는 props를 전달 받고 주는 쪽의 상태가 변경된 경우
- 나는 자주 변하지 않는데 부모가 자주 변하는 경우 일때 우용함, 리스트 아이템 같은


## useCallback 
- 메모이제이션을 할때 변하는 함수 포인터를 받는 경우 무효가 된다. 이때 함수포인터를 고정하여 보내면 된다
```
const cashedFn = useCallback(fn, dependencies);
// const increment = useCallback(() => setCount((count) => count + 1), []);
```

## useDeferredValue
## useTransition

## useContext


## useLayoutEffect
## useImperativeHandle
## useDebugValue

## useSyncExternalStore
## useInsertionEffect   