import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components//Header';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1">
                <Header />
                <div className="title title__color">
                    <h2 className='mt-3 mb-6 text-2xl text-teal-600 font-bold text-center uppercase'>
                        <strong>Список справ на сьогодні: </strong> 
                        <em className='text-cyan-400'> 1. Не сьогодні!</em>
                    </h2>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
      )
}



