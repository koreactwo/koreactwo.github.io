import {  useEffect, useReducer, useState, useRef } from "react";
import { useOutletContext } from "react-router";

import FloatButton from "../components/FloatButton";
import TodoItem from "../components/TodoItem";

export type TodoState = {
    id: number;
    text: string;
    completed: boolean;
    version: number;
}

export type TodoAction = 
    {type: 'ADD'; payload: TodoState} | 
    {type: 'DELETE'; payload: TodoState} | 
    {type: 'TOGGLE'; payload: TodoState} |
    {type: 'UPDATE'; payload: TodoState};

const todoReducer = (state: TodoState[], action: TodoAction): TodoState[] => {
    console.log('todoReducer',action.type, action.payload); // 참조 무결성 때문에 map 으로 복사본을 만듦
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];  
        case 'DELETE':
            return state.filter(todo => todo.id !== action.payload.id);
        case 'TOGGLE': 
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
        case 'UPDATE':
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
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
    const addRef = useRef<HTMLDialogElement>(null);
    


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
            <div className="text-center">CloudTodo page</div> 
            {[...todos].reverse().map((todo) => {
                return(
                    <TodoItem key={todo.id} todo={todo} dispatch={dispatch}/>
                );
            })}
            <FloatButton top={top} left={left} onClick={() => addRef.current?.showModal()}/>
            <AddModal addRef={addRef} dispatch={dispatch}/>
           
        </div>
        
        );
    

}

export default CloudTodo;


interface AddProps {
    dispatch: React.Dispatch<TodoAction>;
    addRef: React.RefObject<HTMLDialogElement | null>;
}

const AddModal = ({ addRef, dispatch }: AddProps) => {
    // 1. 입력값을 관리할 로컬 state (초기값은 todo.text)
    const [inputValue, setInputValue] = useState("");

    const handleUpdate = (e?: React.SubmitEvent<HTMLFormElement>) => {
        if(e) e.preventDefault();
        if (inputValue.trim() === "") return; // 빈 값 체크
        // 2. 실제 데이터 반영
        dispatch({
            type: 'ADD', // reducer에 정의된 수정 액션 타입
            payload: { id: Date.now(), completed: false, text: inputValue, version: 1}
        });

        setInputValue(''); // 입력창 초기화

        // 엔터로 등록 후 모달을 수동으로 닫고 싶을 때
        addRef.current?.close();

        // 모달이 닫힐 때 활성화된 엘리먼트(이전 버튼 등)의 포커스를 강제로 해제
        (document.activeElement as HTMLElement)?.blur();
    };

    const handleEsc = (e: React.SyntheticEvent<HTMLDialogElement>) => {
            console.log('esc key event', e);
            setInputValue("");
            addRef.current?.close();
            (document.activeElement as HTMLElement)?.blur();
        }

    const handleCancel = () => {
        setInputValue("");
        addRef.current?.close();
    };


    return (
        <dialog ref={addRef} className="modal" onCancel={handleEsc}>
            <div className="modal-box" >
                <h3 className="font-bold text-lg"> ⚠️ 추 가 </h3>
                <form method="dialog" onSubmit={handleUpdate}>

                {/* 3. onChange를 통해 입력값 실시간 반영 */}
                <input 
                    type='text' 
                    className="input input-bordered w-full my-4" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <div className="modal-action">
                    {/* <form method="dialog"> */}
                        {/* 4. 수정 버튼 클릭 시 handleUpdate 실행 */}
                        
                        <button  type="button" onClick={handleCancel} className="btn btn-secondary mx-1">취소</button>
                        {/* <button className="btn btn-primary mx-1" onClick={handleUpdate}> */}
                        <button type="submit" className="btn btn-primary mx-1">
                            추가
                        </button>
                    {/* </form> */}
                </div>
                </form>
            </div>
        </dialog>
    );
}