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
          <div className="h-24 flex items-center bg-white p-5 rounded-xl">
            <img src="src/assets/iconTodo.jpg" alt="Опис зображення" className="w-24 h-24" />
            <a href="#home" className="text-green-500 text-5xl font-bold">My Notes</a>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
                    <div className="flex items-center space-x-20">
                  <div className="text-white text-3xl mt-3">Welcome <span className="text-white font-bold">{currentUser.name}</span>!</div>
                  <button onClick={handleLogout} className="w-32 h-14 border-green-700 border-dotted border-4 text-white text-2xl font-bold mt-3 rounded hover:bg-green-300">Вийти</button>
                </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={handleRegistration} className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-green-500 text-2xl">Зареєструватися</button>
                <button onClick={handleLogin} className="bg-white text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white text-2xl">Увійти</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
