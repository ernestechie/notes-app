import CreateNoteForm from '../../components/Notes/CreateNoteForm';

export default function CreateNote() {
  return (
    <div>
      <p className='mb-8 font-extrabold text-xl'>Create Note</p>
      <CreateNoteForm state='create' />
    </div>
  );
}
