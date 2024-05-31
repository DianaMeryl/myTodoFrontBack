import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Update() {

    const [newTodoText, setNewTodoText] = useState('');

    const navigate = useNavigate();
    const { id }= useParams();
 

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/todos/${id}`, { todoText: newTodoText })
            .then(res => {
                console.log(res);
                navigate('/todo');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="flex h-screen bg-info bg-opacity-25 justify-center items-center">
            <div className="w-1/2 bg-danger bg-opacity-25 rounded p-3 text-lg">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <h2 className="text-primary text-center mb-4 font-bold text-2xl">Update Todo</h2>
                    <div className='mb-2'>
                        <label htmlFor="firstName">Ваша нотатка</label>
                        <input
                            type="text"
                            value={newTodoText}
                            placeholder='Enter Updated Note'
                            className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200'
                            onChange={e => setNewTodoText(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg'>Update</button>
                    </div>
                    <div className='flex justify-end mb-3'>
                        <Link to='/todo' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}