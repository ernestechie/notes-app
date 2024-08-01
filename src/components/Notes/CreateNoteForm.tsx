import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/auth-context';
import { db } from '../../firebase.config';
import { NotesType } from '../../types';
import Button from '../Button';
import TextInput from '../TextInput';

interface CreateNoteFormProps {
  state: 'create' | ' edit';
}

export default function CreateNoteForm({ state }: CreateNoteFormProps) {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const createNote = async (e: FormEvent) => {
    e.preventDefault();

    const id = uuidv4();

    if (userData) {
      const noteData: NotesType = {
        ...note,
        id,
        userId: userData?.id,
        createdAt: Timestamp.now(),
      };

      const ref = doc(db, 'notes', id);

      try {
        toast.loading('Creating note...');
        await setDoc(ref, noteData).then(() => {
          toast.dismiss();
          toast.success('Notes created successfully!');

          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        });
      } catch (error) {
        toast.error('Error! Cannot create note!');
      }
    }
  };

  return (
    <div className='p-4 bg-gray-50 rounded-xl'>
      <form onSubmit={createNote}>
        <TextInput
          placeholder='Title...'
          name='title'
          id='title'
          value={note.title}
          onChange={inputChangeHandler}
        />
        <textarea
          name='content'
          id='content'
          className='resize-none outline-none border border-gray-200 rounded-xl min-h-72 block w-full my-4 p-4 text-gray-600'
          placeholder='Body...'
          value={note.content}
          onChange={inputChangeHandler}
        ></textarea>
        <Button block color={state === 'create' ? 'secondary' : 'primary'}>
          {state === 'create' ? 'Create' : 'Edit'}
        </Button>
      </form>
    </div>
  );
}
