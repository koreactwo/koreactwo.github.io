import { type TodoState, type TodoAction} from '../pages/CloudTodo.tsx';

const TodoItem = ({todo : {id, text, completed} , dispatch}: {todo: TodoState, dispatch: React.Dispatch<TodoAction>}) => {

    return (
       <div>
                <p>{text}</p>
                <p>{id}</p>
                <p>{completed}</p>
                <button >수정</button>
                <button className='btn'  onClick={() => dispatch({type: 'DELETE', payload: {id, text, completed}})}>삭제</button>
                
            
        </div>
    );
}

export default TodoItem;