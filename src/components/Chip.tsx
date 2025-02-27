function Chip({ children }: any) {
  return (
    <span className="bg-white dark:bg-dark-blue px-4 py-1 text-sm rounded-sm shadow-sm cursor-pointer hover:bg-zinc-50 hover:dark:bg-very-dark-blue-elements">
      {children}
    </span>
  );
}

export default Chip;
