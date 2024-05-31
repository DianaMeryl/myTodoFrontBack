import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

export default function Header() {

  const currentUser = useSelector(state => state.currentUser);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const history = useNavigate();
  const dispatch = useDispatch();
  
  console.log("Current User in Header:", currentUser);
  console.log("Is Logged In:", isLoggedIn);

console.log(isLoggedIn);

  const handleLogin = () => {
    history("/login");
  };

  const handleRegistration = () => {
    history("/home");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history('/login');
  };

  return (
    <div className="bg-green-300">
      <nav className="flex items-center justify-between bg-green-500 p-5">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" className="text-white text-2xl font-bold">List todos</a>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-5">
                <div className="flex flex-col">
                  <p className="text-white">Welcome {currentUser.name}!</p>
                  <button onClick={handleLogout} className="text-white text-sm mt-2 hover:underline">Вийти</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={handleRegistration} className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-green-500">Зареєструватися</button>
                <button onClick={handleLogin} className="bg-white text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white">Увійти</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
