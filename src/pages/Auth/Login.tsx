import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { auth } from '../../firebase.config';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userData;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim().length === 0 || password.length === 0)
      toast.error('One or more inputs are invalid');

    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res.user) {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Incorrect email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className='text-xl font-bold mb-8'>Login</p>
      <form onSubmit={handleFormSubmit}>
        <div className='my-4'>
          <TextInput
            type='email'
            placeholder='Email Address'
            id='email'
            value={email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='my-4'>
          <TextInput
            type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={inputChangeHandler}
          />
        </div>
        <Button block loading={loading} disabled={loading}>
          Sign In
        </Button>
      </form>

      <div className='mt-8'>
        Don`t have an account?{' '}
        <Link to='/signup' className='font-bold text-secondary'>
          Register
        </Link>
      </div>
    </div>
  );
}
