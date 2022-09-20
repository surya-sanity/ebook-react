interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | undefined;
}

const CTA = (props: Props) => {
  const { className } = props;
  return (
    <button
      {...props}
      className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200
   transform bg-purple-700 rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600 ${
     className ? className : ""
   }`}
    >
      {props.children}
    </button>
  );
};
export default CTA;
