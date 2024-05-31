import { useDispatch } from 'react-redux';
import {
    removeTodo,
    markCompleted,
    markIncomplete,
} from '../redux/actions';
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa';
import { BiDotsHorizontal } from "react-icons/bi";
import axios from 'axios';
import { Link } from 'react-router-dom';


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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4 font-roboto text-2xl ">
        <div className="flex items-center">
            <span className="mr-4 text-gray-500">{index + 1}.</span>
            <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.todoText}</span>
        </div>
        <div className="flex space-x-2">
            <Link
                to={`/edit/${todo.id}`}
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm">
                <FaEdit />
            </Link>
            <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm"
                onClick={removeTodoDB}>
                <FaTrash />
            </button>
            {!todo.completed && (
            <button
                className="flex items-center justify-center  bg-yellow-500  hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-sm"
                onClick={() => dispatch(markCompleted(todo.id))}>
                <BiDotsHorizontal  /> 
            </button>
            )}
            {todo.completed && (
            <button
                className="flex items-center justify-center bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded text-sm"
                onClick={() => dispatch(markIncomplete(todo.id))}>
                <FaCheck />
            </button>
            )}
        </div>
        </div>
    );
};

export default TodoItem;