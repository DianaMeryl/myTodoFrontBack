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
};

return (
    <div className="flex">
    <div className="w-1/2 flex items-center justify-center bg-blue-200 p-4">
        <img src="src/assets/registration.jpg" alt="Опис зображення" className="max-w-full max-h-full  shadow-2xl" />
    </div>
    <div className=" w-1/2  p-4 flex items-center justify-center min-h-screen bg-blue-200 ">
        <div className="w-full max-w-md">
            <h3 className="text-center mb-5 text-5xl text-green-600 font-bold">Sign Up</h3>
            <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 space-y-4 bg-opacity-50">
                <div className="mb-4">
                    <label className="block text-blue-500 text-2xl italic font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input 
                        className="h-16 shadow appearance-none border rounded w-full py-2 px-3 text-xl text-blue-800 font-bold leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your name"
                        type="text" 
                        onChange={getdata} 
                        name="name" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-blue-500 text-2xl italic font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="h-16 shadow appearance-none border rounded w-full py-2 px-3 text-xl text-blue-800 font-bold leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your email"
                        type="email" 
                        onChange={getdata} 
                        name="email" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-blue-500 text-2xl italic font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="h-16 shadow appearance-none border rounded w-full py-2 px-3 text-xl text-blue-800 font-bold leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your password"
                        type="password" 
                        onChange={getdata} 
                        name="password"  
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        onClick={addData} 
                        type="submit" 
                        className="bg-green-500 h-16 hover:bg-indigo-600 text-white text-2xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>
            </form>
            <p className="mt-1 text-center text-2xl italic">Already Have an Account? 
                <span>
                    <NavLink to="/login" className="text-indigo-500 hover:underline"> Sign In</NavLink>
                </span>
            </p>
        </div>
    </div>
    </div>
);
}
