import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function Sidebar({ open, onClose, onDashboardClick }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed sm:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-4
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin</h2>

          {/* Close icon on mobile */}
          <button className="sm:hidden" onClick={onClose}>
            <FaTimes size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => {
              onDashboardClick(); // ✅ reset search
              onClose();          // ✅ close sidebar on mobile
            }}
            className="hover:text-blue-400"
          >
            Dashboard
          </Link>

          <Link
            to="/add"
            onClick={onClose}
            className="hover:text-blue-400"
          >
            Add Blog
          </Link>
        </nav>
      </aside>
    </>
  );
}
