import { Timestamp } from 'firebase/firestore';
import React from 'react';

export interface UserDataType {
  id: string;
  username: string;
  email: string;
  createdAt: Timestamp;
}

export interface NotesType {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

export type TextInputPropTypes = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  error?: boolean | string;
  hint?: string;
  format?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
};

export interface ButtonPropType {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
