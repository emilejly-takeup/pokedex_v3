interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function NavigationButton({ text, onClick }: Props) {
  return (
    <button
      className="bg-transparent active:bg-red-600 hover:bg-gray-300 text-black hover:text-white w-14 h-14 p-3 m-3 text-xl rounded-full cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
