import clsx from 'clsx';
import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { ButtonPropType } from '../types';

export default function Button(props: ButtonPropType) {
  const {
    type,
    disabled,
    onClick,
    className,
    loading,
    children,
    block,
    color = 'primary',
  } = props;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        'px-8 py-3 text-sm text-white rounded-full font-semibold relative',
        block && 'block w-full',
        color === 'primary' && 'bg-primary',
        color === 'secondary' && 'bg-secondary',
        className
      )}
      onClick={onClick}
    >
      <span
        style={{ opacity: loading ? 0 : 1 }}
        className='text-center flex items-center justify-center gap-2'
      >
        {children}
      </span>
      <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {loading && (
          <CgSpinner size={25} className={`animate-spin text-white`} />
        )}
      </span>
    </button>
  );
}
