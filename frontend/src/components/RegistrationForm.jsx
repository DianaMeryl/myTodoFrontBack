import React from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerUserSuccess } from '../redux/actions';
import { useDispatch } from 'react-redux';
// import selectUsersMemoized from '../redux/selectors';

export default function RegistrationForm() {

const history = useNavigate();
const dispatch = useDispatch();
// const users = useSelector(selectUsersMemoized);
// 
const[inpValue, setInpValue] = useState({
    name:"",
    email:"",
    password:"",
});

const getdata = (e) => {
    const { value, name } = e.target;

    setInpValue(() => {
        return { ...inpValue,
                [name]:value,
            }
    })
}

const registerUser = async (name, email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register user');
        }

        const newUser = await response.json();

        dispatch(registerUserSuccess(newUser));

    } catch (error) {

        console.error('Error:', error);
    }
};

const addData = (e) => {
    e.preventDefault();

    const{name, email, password} = inpValue;

    if( name === ""){
        alert("name is required")
    }
    else if( email === ""){
        alert("email is required")
    }
    else if( !email.includes("@")){
        alert("enter valid email")
    }
    else if( password === ""){
        alert("password is required")
    }
    else {
        registerUser(name, email, password);
        history("/todo");
    }
}

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
            <h3 className="text-center mb-5 text-2xl font-bold">Sign Up</h3>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Enter your name
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        onChange={getdata} 
                        name="name" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Enter your email
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="email" 
                        onChange={getdata} 
                        name="email" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Enter your password
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="password" 
                        onChange={getdata} 
                        name="password"  
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        onClick={addData} 
                        type="submit" 
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <p className="mt-1 text-center">Already Have an Account? 
                <span>
                    <NavLink to="/login" className="text-indigo-500 hover:underline"> Sign In</NavLink>
                </span>
            </p>
        </div>
    </div>
);
}
