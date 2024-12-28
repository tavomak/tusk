const Hamburger = ({ open = false, setOpen }) => (
  <button
    type="button"
    className="z-20 w-10 h-10 border-2 border-white rounded-full"
    aria-label="Menu"
    onClick={() => setOpen(!open)}
  >
    <div className="relative grid gap-1 justify-items-center">
      <span
        className={`h-[2px] w-4 rounded-full bg-white transition ${open && 'absolute top-1/2 left-1/2 rotate-45 -translate-y-1/2 -translate-x-1/2'} `}
      />
      <span
        className={`h-[2px] w-4 rounded-full bg-white transition ${open && 'scale-x-0'}`}
      />
      <span
        className={`h-[2px] w-4 rounded-full bg-white ${open && 'absolute top-1/2 left-1/2 -rotate-45 -translate-y-1/2 -translate-x-1/2'}`}
      />
    </div>
  </button>
);

export default Hamburger;
