import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [searchText, setSearchText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔹 reset search when Dashboard is clicked
  const resetSearch = () => {
    setSearchText("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onDashboardClick={resetSearch}   // ✅ added
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          onSearch={setSearchText}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 overflow-auto">
          {typeof children === "function"
            ? children(searchText)
            : children}
        </main>
      </div>
    </div>
  );
}
