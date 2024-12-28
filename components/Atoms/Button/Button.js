import React from 'react';
import Spinner from '@/components/Atoms/Spinner';

const Button = ({
  children,
  loading = false,
  loadingType,
  text = '',
  className = '',
  submit = false,
  onClick,
  disabled = false,
}) => (
  <button
    className={`${className} flex align-center gap-2 disabled:opacity-70`}
    type={submit ? 'submit' : 'button'}
    onClick={onClick}
    disabled={loading || disabled}
  >
    {loading && <Spinner type={loadingType} />}
    {children ?? text}
  </button>
);

export default Button;
