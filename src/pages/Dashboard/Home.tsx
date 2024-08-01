import { signOut } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import NoteItem from '../../components/Notes/NoteItem';
import TextInput from '../../components/TextInput';
import { useAuth } from '../../context/auth-context';
import { auth, db } from '../../firebase.config';
import { NotesType } from '../../types';

export default function DashboardHome() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [notes, setNotes] = useState<NotesType[]>([]);

  useEffect(() => {
    const NOTES: NotesType[] = [];
    const notesRef = collection(db, 'notes');

    // Create a firebase firestore query for getting all notes for the corresponding loggedin user.
    const q = query(notesRef, where('userId', '==', userData?.id));

    onSnapshot(q, (snap) => {
      snap.docs.forEach((doc) => {
        NOTES.push({ ...doc.data(), id: doc.id } as NotesType);
      });

      setNotes([]);
      setNotes(NOTES);
    });
  }, [userData]);

  // This function returns the notes corresponding to the search value.
  const renderedNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.includes(searchValue) || note.content.includes(searchValue)
    );
  }, [notes, searchValue]);

  const deleteNote = async (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const docRef = doc(db, 'notes', id);

      const filteredNotes = notes.filter((note) => note.id !== id);

      toast.loading('Deleting...');
      await deleteDoc(docRef)
        .then(() => {
          setNotes([]);
          setNotes(filteredNotes);

          toast.dismiss();
          toast.success('Note deleted!');
        })
        .catch(() => toast.error('Cannot delete doc.'));
    }
  };

  const logoutUser = async () => {
    await signOut(auth).then(() => navigate('/'));
  };

  return (
    <section className='page'>
      <p className='font-medium text-xl text-gray-700'>
        Welcome, <span className='font-bold'>{userData?.username}</span>
      </p>

      <div className='my-8'>
        <p className='font-bold text-xl text-gray-700 mb-4'>Notes</p>
        <div className='max-w-xl'>
          <TextInput
            placeholder='Search...'
            leftIcon={<IoSearchOutline />}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Link to='/dashboard/create-note' className='mt-4 block'>
            <Button className='rounded-full' color='secondary'>
              <FaPlus />
              Create note
            </Button>
          </Link>
        </div>

        <div className='mt-8 rounded-xl'>
          <>
            {renderedNotes && renderedNotes.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {renderedNotes.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onDeleteNote={deleteNote}
                  />
                ))}
              </div>
            )}
            {!renderedNotes ||
              (renderedNotes.length === 0 && (
                <div className='p-8 text-center bg-gray-100 rounded-xl'>
                  <p className='text-3xl font-semibold py-8 text-gray-700'>
                    No notes found
                  </p>
                </div>
              ))}
          </>
        </div>
      </div>

      <Button className='bg-red-700' onClick={logoutUser}>
        Log Out
      </Button>
    </section>
  );
}
