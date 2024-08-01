import React, { useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { checkingStatus, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated, redirect if not.

    if (!checkingStatus && !isAuthenticated) {
      navigate('/');
    }
  }, [checkingStatus, isAuthenticated, navigate]);

  if (checkingStatus)
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <CgSpinner className='animate-spin text-5xl' />
      </div>
    );

  return (
    <div className='min-h-screen p-4 relative bg-white sm:p-8 md:p-16'>
      <Outlet />
    </div>
  );
}
