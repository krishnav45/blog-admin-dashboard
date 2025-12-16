import { FaBars } from "react-icons/fa";

export default function Navbar({ onSearch, onMenuClick }) {
  return (
    <div className="h-14 bg-white shadow flex items-center px-4 gap-3 w-full">
      {/* Hamburger only on mobile */}
      <button
        className="sm:hidden text-gray-700"
        onClick={onMenuClick}
      >
        <FaBars size={20} />
      </button>

      <h1 className="font-semibold text-lg flex-shrink-0">
        Blog Admin
      </h1>

      <input
        type="text"
        placeholder="Search by title or author..."
        onChange={(e) => onSearch(e.target.value)}
        className="ml-auto border px-3 py-1 rounded w-full sm:max-w-xs"
      />
    </div>
  );
}
