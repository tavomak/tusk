const Hamburger = ({ open = false, setOpen }) => {
  return (
    <button
      type="button"
      className="h-10 w-10 rounded-full border-2 border-white z-20"
      aria-label="Menu"
      onClick={() => setOpen(!open)}
    >
      <div className="grid justify-items-center gap-1 relative">
        <span
          className={`h-[2px] w-4 rounded-full bg-white transition ${open && "absolute top-1/2 left-1/2 rotate-45 -translate-y-1/2 -translate-x-1/2"} `}
        />
        <span
          className={`h-[2px] w-4 rounded-full bg-white transition ${open && "scale-x-0"}`}
        />
        <span
          className={`h-[2px] w-4 rounded-full bg-white ${open && "absolute top-1/2 left-1/2 -rotate-45 -translate-y-1/2 -translate-x-1/2"}`}
        />
      </div>
    </button>
  );
};

export default Hamburger;
