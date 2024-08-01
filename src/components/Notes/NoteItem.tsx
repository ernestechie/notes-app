import { Link } from 'react-router-dom';
import { NotesType } from '../../types';
import Button from '../Button';

export default function NoteItem({
  note,
  onDeleteNote,
}: {
  note: NotesType;
  onDeleteNote(id: string): void;
}) {
  const { title, content, id } = note;

  return (
    <div className='p-6 border border-blue-300 rounded-2xl shadow-lg bg-white'>
      <p className='font-bold capitalize text-primary text-lg'> {title}</p>
      <p className='text-gray-700 italic my-6 text-sm flex-1'>{content}</p>

      <div className='flex gap-4'>
        <Link to={`/dashboard/edit-note/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Button className='bg-red-700' onClick={() => onDeleteNote(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
