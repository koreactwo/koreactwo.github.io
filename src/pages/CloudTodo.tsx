import {  useEffect, useReducer, useState } from "react";
import { useOutletContext } from "react-router";

import FloatButton from "../components/FloatButton";
import TodoItem from "../components/TodoItem";

export type TodoState = {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoAction = {type: 'ADD'; payload: TodoState} | {type: 'DELETE'; payload: TodoState} | {type: 'TOGGLE'; payload: TodoState} |
    {type: 'UPDATE'; payload: TodoState};

const todoReducer = (state: TodoState[], action: TodoAction): TodoState[] => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];  
        case 'DELETE':
            return state.filter(todo => todo.id !== action.payload.id);
        case 'TOGGLE':
            return state.map(todo => todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo);
        case 'UPDATE':
            return state.map(todo => todo.id === action.payload.id ? {...todo, text: action.payload.text} : todo);
        default:
            return state;
    }
}


const CloudTodo = () => {
    // 완료된항목 일괄 삭제 버튼 
    // 추가 버튼 ... 다이얼로그 
    // 상태가 변하면 다시그린다
    const [todos, dispatch] = useReducer(todoReducer, []);
    const { rect } = useOutletContext<{ rect: DOMRect }>();
    const [top, setTop] = useState(10);
    const [left, setLeft] = useState(10);


    useEffect(() => {
        console.log('CloudTodo useEffect rect : ', rect);
        if(rect){
            console.log('CloudTodo useEffect rect if top + height : ', rect.top + rect.height);
            setTop(rect.top + rect.height - 80);
            setLeft(rect.left + rect.width - 80);
        }
    }, [rect]);


    return (
        
        <div className=" bg-primary/10 h-full w-full relative overflow-y-auto">
            <div>CloudTodo page</div> 
            {[...todos].reverse().map((todo) => {
                return(
                    <TodoItem key={todo.id} todo={todo} dispatch={dispatch}/>
                );
            })}
            <FloatButton top={top} left={left} onClick={() => dispatch({type: 'ADD', payload: {id: Date.now(), text: 'test', completed: false}})}/>
                
        </div>
        
        );
    

}

export default CloudTodo;
