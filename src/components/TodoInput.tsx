import { useState } from "react";

// 타입 , 액션, 뷰


type todo = {
    id: number;
    text: string;
    completed: boolean;
}


const TodoInput = () => {
    const [todo, setTodo] = useState<todo | null>(null);

    return (
        <>
            <form>
                <input type="text" placeholder="할 일을 입력하세요" />
                <button type="submit">수정</button>
                <button type="submit">추가</button>
            </form>
        </>
    );
}