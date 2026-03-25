import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { type TodoState, type TodoAction } from '../pages/CloudTodo.tsx';

interface ModifyProps {
    todo: TodoState;
    dispatch: React.Dispatch<TodoAction>;
    modifyRef: React.RefObject<HTMLDialogElement | null>;

}
const TodoItem = ({ todo, dispatch }: { todo: TodoState, dispatch: React.Dispatch<TodoAction> }) => {
    // 수정, 삭제, 완료토글
    const modifyRef = useRef<HTMLDialogElement>(null);
    const { text, completed } = todo;

    return (
        <div className='flex flex-row hover:bg-secondary/10 items-center justify-between p-2 mb-1'>

            <button className='sixtick-btn flex-1 ml-6' onClick={() => dispatch({ type: 'TOGGLE', payload: todo })}>
                {completed ? '✔️' : '🔹'}
                <span className={`w-full ${completed ? 'font-normal text-gray-400' : ''}`}>{text}</span>
            </button>

            <div>
                <button className='sixtick-btn' onClick={() => modifyRef.current?.showModal()}>✏️</button>
                <button className='sixtick-btn' onClick={() => dispatch({ type: 'DELETE', payload: todo })}>❌</button>
            </div>
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
            <ModifyModal modifyRef={modifyRef} todo={todo} dispatch={dispatch} />
        </div>
    );
}

export default TodoItem;

// 수정 모달 창


const ModifyModal = ({ modifyRef, todo, dispatch }: ModifyProps) => {
    // 1. 입력값을 관리할 로컬 state (초기값은 todo.text)
    const [inputValue, setInputValue] = useState(todo.text);

    // todo가 변경될 때(다른 아이템 클릭 시) 입력창도 동기화
    useEffect(() => {
        setInputValue(todo.text);
    }, [todo.text]);

    const handleUpdate = (e?: React.SubmitEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        // if (inputValue.trim() === "") return; // 빈 값 체크
        // 2. 실제 데이터 반영
        dispatch({
            type: 'UPDATE', // reducer에 정의된 수정 액션 타입
            payload: { ...todo, text: inputValue }
        });

        // 엔터로 등록 후 모달을 수동으로 닫고 싶을 때
        modifyRef.current?.close();

        // 모달이 닫힐 때 활성화된 엘리먼트(이전 버튼 등)의 포커스를 강제로 해제
        (document.activeElement as HTMLElement)?.blur();
    };

    const handleEsc = (e: React.SyntheticEvent<HTMLDialogElement>) => {
        console.log('esc key event');
        setInputValue(todo.text);
        modifyRef.current?.close();
        (document.activeElement as HTMLElement)?.blur();
    }
    const handleCancel = () => {
        setInputValue(todo.text);
        modifyRef.current?.close();
    };

    return (
        <dialog ref={modifyRef} className="modal" onCancel={handleEsc}>
            <div className="modal-box" >
                <h3 className="font-bold text-lg"> ⚠️ 수 정 </h3>

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

                        <button type='button' onClick={handleCancel} className="btn btn-secondary mx-1">취소</button>
                        <button type='submit' className="btn btn-primary mx-1" >
                            수정
                        </button>
                        {/* </form> */}
                    </div>
                </form>
            </div>
        </dialog>
    );
}