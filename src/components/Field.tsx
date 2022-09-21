import { forwardRef } from 'react';

const Field = forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: any) => {
  return (
    <input
      {...props}
      ref={ref}
      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
    />
  )
})

export default Field;

export const FieldArea = forwardRef((props: React.TextareaHTMLAttributes<HTMLTextAreaElement>, ref: any) => {

  return (
    <textarea
      {...props}
      ref={ref}
      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
    />
  )
})