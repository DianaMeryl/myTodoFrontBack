import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodoSuccess, updateSearchTerm, addTodoFailure, fetchTodos } from '../redux/actions';
import axios from 'axios';


//31 05 2024

const Todo = ({ userId }) => {
    const dispatch = useDispatch();
    const [newTodoText, setNewTodoText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
            const response = await axios.post('http://localhost:5000/api/addtodo', {
                userId: userId,
                todoText: todoText,
            });
            return response.data;  // Повертаємо додану нотатку
        } catch (error) {
            dispatch(addTodoFailure(error.message));
            throw error;
        }
    };

    const handleAddTodoClick = async () => {
        try {
            const newTodo = await addTodo(userId, newTodoText.trim());
            dispatch(addTodoSuccess(newTodo));
            setNewTodoText('');
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
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
        <div style={{ maxWidth: '80%' }} className="mx-auto sm:mt-8 p-4 bg-yellow-50 rounded">
            <div className="flex items-center mb-4">
                <input
                    id="addTodoInput"
                    className="flex-grow p-2 border-b-2 border-gray-300 text-3xl italic focus:outline-none focus:border-blue-500"
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
                        className="flex-grow p-2 border-b-2 border-gray-300 text-xl focus:outline-none focus:border-blue-500"
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