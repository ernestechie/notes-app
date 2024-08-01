import { TextInputPropTypes } from '../types';

export default function TextInput(props: TextInputPropTypes) {
  const { placeholder = '', value, onChange, id, type } = props;

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      className='px-6 py-3 rounded-full w-full block border border-gray-200 outline-none font-light text-gray-800'
      onChange={onChange}
    />
  );
}
