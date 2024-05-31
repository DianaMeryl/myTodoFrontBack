import { useDispatch } from 'react-redux';
import {
    toggleTodo,
    removeTodo,
    markCompleted,
    markIncomplete,
} from '../redux/actions';
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';


const TodoItem = ({ todo, index }) => {

const dispatch = useDispatch();

const removeTodoDB = async () => {
    try {

        await axios.delete(`http://localhost:5000/api/remove/${todo.id}`);
        dispatch(removeTodo(todo.id));

} catch (error) {
    console.error('Error removing user todos:', error.message);
}
};

return (
<li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
    <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.todoText}</span>
    </div>
    <div className='space-x-3 ml-8'>
    <button className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded" 
            onClick={() => dispatch(toggleTodo(todo.id))}>{todo.completed ? <FaToggleOff /> : <FaToggleOn />}
    </button>
    <button className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={removeTodoDB}><FaTrash />
    </button>
    {!todo.completed && (
        <button className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
                onClick={() => dispatch(markCompleted(todo.id))}><FaCheck />
        </button>
    )}
    {todo.completed && (
        <button className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
                onClick={() => dispatch(markIncomplete(todo.id))}><FaTimes />
        </button>
    )}
    </div>
</li>
);
};

export default TodoItem;