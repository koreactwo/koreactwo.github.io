import React, { useReducer, useState, useRef, useEffect } from "react";
import { XMark, CheckMark} from "../Icons";

/**
 * 할일 
 * @param id 저장하고 불러왔을때 충돌방지를 위해 Date.now() 를 쓴다
 * @param text 할일 내용
 * @param completed 완료 유무 , 쓰지않음. 그냥 삭제 해버려 ㅋㅋ
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface DynamicProps extends React.HTMLAttributes<HTMLElement> {
    as? : React.ElementType;
}

type todoAction = 
    { type: 'INIT_TODO', payload: Todo[] } | 
    { type: 'ADD_TODO', payload: { id: number, text: string } } | 
    { type: 'DELETE_TODO', payload: { id: symbol | number } } | 
    { type: 'TOGGLE_TODO', payload: { id: symbol | number } }; // union type

interface dispatchProps {
    dispatch: React.Dispatch<todoAction>
}



const todoReducer = (state: Todo[], action: todoAction): Todo[] => {
    switch (action.type) {
        case 'INIT_TODO':
            return action.payload;
        case 'ADD_TODO':
            return [...state, {
                id: action.payload.id,
                text: action.payload.text,
                completed: false,
            }]; 
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload.id);
        case 'TOGGLE_TODO':
            return state.map(todo => 
                todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
            );
        default:
            return state;
    }
}


const TodoItem = React.memo( ( { todo, dispatch } : { todo: Todo, dispatch: React.Dispatch<todoAction> }) => {

    console.log(`${todo.id} ${todo.text} render`); // 디버깅 로그 

    return (
        <div className="flex items-center justify-between p-4 hover:border-b hover:font-bold">
            <p className="flex-1 flex items-center gap-2" onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}>
                <span className="opacity-50">{todo.completed && <CheckMark/>}</span>
                <span className={todo.completed ? "opacity-50" : ""}>{todo.text}</span> 
            </p>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
                <XMark className="sixtick-btn btn-xs opacity-30 hover:opacity-100"/>
            </button>
        </div>
    );
});


const TodoInput = React.memo(( { dispatch } : dispatchProps ) => {
    // const id = Date.now();
    console.log('TodoInput render');
    const [todo, setTodo] = useState<Todo>({
        id: 0,
        text: '',
        completed: false,
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e : React.SubmitEvent ) => {
        // if (todo.text.trim() === '') return;
        e.preventDefault(); // 페이지 새로고침 방지
        dispatch({ type: 'ADD_TODO', payload: {id : Date.now(), text: todo.text } });
        setTodo({ id: 0, text: '', completed: false });
        inputRef.current?.focus();
      };
  return (
    <div>
    <form className="flex w-full items-center" onSubmit={handleSubmit}>
      <input
        ref={inputRef} // ref 연결
        type="text"
        placeholder="할 일을 입력하세요"
        className="input input-bordered flex-1 ml-2 "
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
        required
        autoFocus
      />
      <button type="submit" className="btn btn-primary mx-2 ">
        추가
      </button>
      </form>
    </div>
  );
});

const TodoList = ({as : Component = 'div',  ...props} : DynamicProps) => {
    // const [todos, dispatch] = useReducer(todoReducer, []
    //     ,() => {const saved = localStorage.getItem("my-todo-list");
    //     return saved ? JSON.parse(saved) : [];
    // });  
    // 세번째 인자가 초기화 함수이긴하나, 초기 데이터를 넣을때 초기화를 같이 해버린다
    const [todos, dispatch] = useReducer(todoReducer, JSON.parse(localStorage.getItem("my-todo-list") || "[]"));

    
    useEffect(() => {
        // 처음 빈 배열일 때 저장되는 것을 방지하려면 조건문을 추가할 수도 있습니다.
        localStorage.setItem("my-todo-list", JSON.stringify(todos));
        // setUsedStorage(localStorage["my-todo-list"].length * 2 / 1024);
        // console.log(`로컬스토리지 사용량 : ${(localStorage["my-todo-list"].length * 2 / 1024).toFixed(2)}KBytes`);
    }, [todos]); // todos가 변경될 때마다 실행

    return (
        <Component {...props}>
        <div className="flex flex-col  h-full min-h-0 ">
            <div className="sticky top-1 z-10 bg-base-100">
            <div><h1 className="text-2xl text-center font-bold m-4 ">할 일 목록</h1></div>
            <div>
                <p className="text-right w-full text-gray-400 text-xs font-light mb-2 ">(로컬스토리지 사용량 : {(JSON.stringify(todos).length * 2 /1024).toFixed(2)}KBytes)</p>
            </div>
            <TodoInput dispatch={dispatch} />
            </div>
            <div className=" px-6  flex-1 min-h-0 overflow-y-auto ">
                {/* {todos.map((todo: Todo) => (
                    <TodoItem todo={todo} dispatch={dispatch} key={todo.id.toString()} />
                ))} */}
                {/* {
                    [...todos].reverse().map((todo: Todo)=> (
                    <TodoItem todo={todo} dispatch={dispatch} key={todo.id.toString()} />
                    ));
                } */}

                {/* {
                    (() => {
                        const res = [];
                        for (let i = todos.length - 1; i >= 0 ; i--) { 
                            console.log(i);
                            res.push(<TodoItem todo={todos[i]} dispatch={dispatch} />)
                        }   
                        return res;
                    })()
                } */}

                {/* 추천하는 렌더링 방식 */}
                {[...todos].reverse().map((todo) => (
                    <TodoItem todo={todo} dispatch={dispatch} key={todo.id} />
                ))}
            </div>
        </div>
        </Component>
    );
};

export default TodoList;