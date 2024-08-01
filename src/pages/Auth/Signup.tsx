import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { auth, db } from '../../firebase.config';
import { UserDataType } from '../../types';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = userData;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.length === 0
    )
      toast.error('One or more inputs are invalid');

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (res.user) {
        // Get the user UID from firebase auth document
        const {
          user: { uid },
        } = res;
        const data: UserDataType = {
          id: uid,
          email,
          username,
          createdAt: Timestamp.now(),
        };

        // Set user data to firebase firstore
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, data)
          .then(() => {
            navigate('/dashboard');
          })
          .catch(() => toast.error('Something went wrong'));
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className='text-xl font-bold mb-8'>Create Account</p>
      <form onSubmit={handleFormSubmit}>
        <div className='my-4'>
          <TextInput
            type='text'
            placeholder='Username'
            id='username'
            value={username}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className='my-4'>
          <TextInput
            type='email'
            placeholder='Email Address'
            id='email'
            value={email}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className='my-4'>
          <TextInput
            type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <Button block loading={loading} disabled={loading}>
          Sign Up
        </Button>
      </form>

      <div className='mt-8'>
        Already have an account?{' '}
        <Link to='/' className='font-bold text-secondary'>
          Login
        </Link>
      </div>
    </div>
  );
}
