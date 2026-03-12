import React, { useReducer, useState, useRef, useEffect } from "react";
import { Xmark } from "../Icons";

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


export const TodoItem = ( { todo, dispatch } : { todo: Todo, dispatch: React.Dispatch<todoAction> }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
                <Xmark className="hover:text-red-500 size-6 hover:cursor-pointer"/>
            </button>
        </div>
    );
}


const TodoInput = ( { dispatch } : dispatchProps ) => {
    // const id = Date.now();
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
    <>
    <form className="flex" onSubmit={handleSubmit}>
      <input
        ref={inputRef} // ref 연결
        type="text"
        placeholder="할 일을 입력하세요"
        className="input input-bordered w-64 max-w-xs"
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
        required
        autoFocus
      />
      <button type="submit" className="btn btn-primary ml-2">
        추가
      </button>
      </form>
    </>
  );
};

const TodoList = ({as : Component = 'div',  ...props} : DynamicProps) => {
    const [todos, dispatch] = useReducer(todoReducer, []
        ,() => {const saved = localStorage.getItem("my-todo-list");
        return saved ? JSON.parse(saved) : [];}
    ); 
    
    useEffect(() => {
        // 처음 빈 배열일 때 저장되는 것을 방지하려면 조건문을 추가할 수도 있습니다.
        localStorage.setItem("my-todo-list", JSON.stringify(todos));
        // setUsedStorage(localStorage["my-todo-list"].length * 2 / 1024);
        // console.log(`로컬스토리지 사용량 : ${(localStorage["my-todo-list"].length * 2 / 1024).toFixed(2)}KBytes`);
    }, [todos]); // todos가 변경될 때마다 실행

    return (
        <Component {...props}>
        <div className="flex flex-col items-center ">
            <h1 className="text-2xl font-bold m-4 ">할 일 목록 </h1>
            <p className="text-right w-full text-gray-400 text-xs font-light mb-2 ">(로컬스토리지 사용량 : {(JSON.stringify(todos).length * 2 /1024).toFixed(2)}KBytes)</p>
            <TodoInput dispatch={dispatch} />
            <div className="w-full px-6">
                {todos.map((todo: Todo) => (
                    <TodoItem todo={todo} dispatch={dispatch} key={todo.id.toString()} />
                ))}
            </div>
        </div>
        </Component>
    );
};

export default TodoList;