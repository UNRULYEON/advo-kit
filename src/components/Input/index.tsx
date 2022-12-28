import { FC, InputHTMLAttributes } from 'react';

type InputProps = {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ leadingIcon, trailingIcon, ...rest }) => {
  const Component = (
    <input
      className={`transition h-10 w-full px-4 border border-gray rounded hover:border-coolblue focus:border-coolblue focus:caret-coolblue ${
        leadingIcon && 'pl-10'
      } ${trailingIcon && 'pr-10'}`}
      {...rest}
    />
  );

  if (!leadingIcon && !trailingIcon) return Component;

  return (
    <div className="relative">
      {leadingIcon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center">{leadingIcon}</div>}
      {Component}
      {trailingIcon && <div className="absolute inset-y-0 right-0 mr-4 flex items-center">{trailingIcon}</div>}
    </div>
  );
};

export default Input;
