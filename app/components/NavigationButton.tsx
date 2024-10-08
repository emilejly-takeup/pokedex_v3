interface Props {
  text: string;
  onClick: () => void;
}

export function NavigationButton({ text, onClick }: Props) {
  return (
    <button
      className="bg-transparent active:bg-red-600 hover:bg-zinc-100 text-zinc-100 hover:text-zinc-800 w-14 h-14 p-3 m-3 text-xl rounded-full cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
