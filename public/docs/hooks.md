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

## React.memo : 컴포넌트 래핑, 컴포넌트 메모이제이션
- 상태를 기억했다가 변경이 없으면 리렌더링하지 않음. 
- 메모이제이션 무효 상황 : 컴포넌트 자체의 상태가 변경된경우, 변경되는 props를 전달 받고 주는 쪽의 상태가 변경된 경우
- 나는 자주 변하지 않는데 부모가 자주 변하는 경우 일때 우용함, 리스트 아이템 같은

## useMemo : 훅은 컴포넌트 내부에서 사용, 값 메모이제이션
- 콜백 함수 개념인데 변경감지 대상이 변경 될때만 실행함. 
- 상태와 연동되어 가공된 데이터가 필요할때, 그 가공행위가 무거운 연산일때
```
const cashedValue = useMemo(무거운 연산의 함수, [변경감지 대상]);
```


## useCallback : 함수 포인터 메모이제이션
- 메모이제이션을 할때 변하는 함수 포인터를 받는 경우 무효가 된다. 이때 함수포인터를 고정하여 보내면 된다
```
const cashedFn = useCallback(fn, dependencies);
// const increment = useCallback(() => setCount((count) => count + 1), []);
```

## React.lazy
- 트리거 로드 : 모듈을 렌더링 시점에 로드함
- 만약에 하위 컴포넌트가 어떤 로직후에 (나중에) 렌더링이 된다면 상위 컴포넌트 렌더링 시점에 로딩 하지않고 실제 렌더링이 필요할때 로딩함
```
import LazyComponent = lazy(() => import('./LazyComponent'));

```

## React.Suspense 
- 지연된 로딩 : 로딩이 오래 걸리는 모듈에 간단한 ui를 대신 보여줄 수 있다
```
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

## useDeferredValue
- 지연시킬 값
- 이 값을 받는 컴포넌트는 렌더링을 즉각 하지 않고 완화된(__빠른 변화를 건너뜀__) 렌더링을 해서 앱에 부담을 주지 않는다.
- 빠르게 입력되는 값을 가공하여 보여주는 컴포넌트에 적절
```
const [value, setValue] = useState(initialValue);
// value가 자주 변경되는 상태인데 이걸 받는 쪽이 연산이 무거워야 할때
const deferredValue = useDeferredValue(value);

<defferComponent value={deferredValue} />
```

## useTransition
- 백그라운드 렌더링, __비동기 렌더링__
- 묵직한 렌더링이 필요할때
- startTransition 콜백 안에 useState 즉 상태를 변경하는 함수가 들어가야함. 결국 하나의 값을 공유한다면 상태를 두개 써야함. 
```
const [num, setNum] = useState(initialValue); // 즉시 반영 상태
const [value, setValue] = useState(initialValue); // 지연 반영 상태
const [isPending, startTransition] = useTransition();

setNum(newValue); // 즉시 반영
startTransition(() => setValue(newValue)); // 지연 반영 

{isPending ? <div>Loading...</div> : <defferComponent value={value} /> } // 지연 상태 연결
// defferComponent 는 내부에서 오래 걸리는 연산이 있다고 가정하고 렌더링 시점에 isPending 를 false로 바꾼다.
```

## useContext


## useLayoutEffect
## useImperativeHandle
## useDebugValue

## useSyncExternalStore
## useInsertionEffect   