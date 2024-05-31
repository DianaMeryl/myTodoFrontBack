import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodoSuccess, updateSearchTerm, addTodoFailure, fetchTodos } from '../redux/actions';
import axios from 'axios';
// import { filteredTodosSelector } from '../redux/selectors'


const Todo = ({ userId }) => {

const dispatch = useDispatch();
const [newTodoText, setNewTodoText] = useState('');
const [searchTerm, setSearchTerm] = useState('');
// const filteredTodos = useSelector(filteredTodosSelector);

useEffect(() => {
    
    const getTodosById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/alltodos/${userId}`);
            dispatch(fetchTodos(response.data));
        } catch (error) {
            console.error('Error fetching user todos:', error.message);
        }
    };

    if (userId) {
        getTodosById();
    } else {
        console.error('userId is undefined');
    }
}, [userId, dispatch]);


const addTodo = async (userId, todoText) => {
    try {
        await axios.post('http://localhost:5000/api/addtodo', {
            userId: userId,
            todoText: todoText,
        });

    } catch (error) {
        dispatch(addTodoFailure(error.message));
    }
};

// const getTodosById = async (userId) => {
//     try {
//     const response = await axios.get(`http://localhost:5000/api/alltodos/${userId}`);
    
//     dispatch(fetchTodos(response.data));

// } catch (error) {
//     console.error('Error fetching user todos:', error.message);
// }
// };


const handleAddTodoClick = async () => {
    
    await addTodo(userId, newTodoText.trim());

    dispatch(addTodoSuccess(newTodoText));

    setNewTodoText('');
};

const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
        await handleAddTodoClick();
    }
};

const handleSearchChange = (value) => {

    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
};

return (
<div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-yellow-50 rounded">
    
    <div className="flex items-center mb-4">
    <input
        id="addTodoInput"
        className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Add Todo"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
    />
    <button
        className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        onClick={handleAddTodoClick}
    >
        <BsPlus size={20} />
    </button>
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <FilterButtons />
    <div className="flex items-center mb-4">
        <input
        className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search Todos"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button className="ml-4 p-2 bg-lime-400 text-white rounded hover:bg-lime-300 focus:outline-none">
        <BsSearch size={20} />
        </button>
    </div>
    </div>

    <TodoList />
</div>
);
};

export default Todo;
