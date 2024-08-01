import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='mb-8 font-extrabold text-2xl text-primary'>
        Ovie Notes App
      </h1>
      <div className='p-8 rounded-3xl border border-gray-200 w-full max-w-xl mx-auto shadow-xl min-h-96'>
        <Outlet />
      </div>
    </div>
  );
}
