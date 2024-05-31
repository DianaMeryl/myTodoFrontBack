import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/actions';


export default function LoginForm() {

const navigate = useNavigate();
const dispatch = useDispatch();

const[inpValue, setInpValue] = useState({
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

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to login user');
        }

        const newUser = await response.json();

        if (!newUser.refreshToken) {
            throw new Error('Token.refreshToken cannot be null');
        }

        if (!newUser.user || !newUser.user.id) {
            throw new Error('User ID is missing in the response');
        }
        
        dispatch(setCurrentUser(newUser.user));
        navigate("/todo");

    } catch (error) {

        console.error('Error:', error);
    }
};


const confirmData = (e) => {
    e.preventDefault();

    const{email, password} = inpValue;

    if( email === ""){
        alert("email is required")
    }
    else if( !email.includes("@")){
        alert("enter valid email")
    }
    else if( password === ""){
        alert("password is required")
    }
    else if( password.length <= 6){
        alert("more than 5 symbols")
    }
    else { 
            loginUser(email, password);
        }
}

return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
        <section className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h3 className="text-center mb-5 text-2xl font-bold">Sign In</h3>
                <form className="formcontainer">
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
                            onClick={confirmData} 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
);
}
