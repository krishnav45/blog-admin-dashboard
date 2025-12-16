import { useState, useEffect } from "react";
import BlogTable from "../components/BlogTable";
import Pagination from "../components/Pagination";
import useLocalStorage from "../hooks/useLocalStorage";

const ITEMS_PER_PAGE = 5;
const PURGE_DAYS = 7; // Permanently delete after 7 days

export default function Dashboard({ searchText = "" }) {
  const [blogs, setBlogs] = useLocalStorage("blogs", []);
    const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("currentPage");
    return saved ? Number(saved) : 1;
  });

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // ✅ Auto-purge deleted blogs
  useEffect(() => {
    const now = Date.now();
    const updated = blogs.filter((b) => {
      if (b.deleted && b.deletedAt) {
        const diff = now - b.deletedAt;
        return diff < PURGE_DAYS * 24 * 60 * 60 * 1000; // keep if not expired
      }
      return true;
    });

    if (updated.length !== blogs.length) setBlogs(updated);
  }, [blogs, setBlogs]);

  // ✅ Soft delete a blog
  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const updated = blogs.map((b) =>
      b.id === id ? { ...b, deleted: true, deletedAt: Date.now() } : b
    );
    setBlogs(updated);
  }

  // 🔹 Filter only active blogs (not deleted)
  const visibleBlogs = blogs.filter((b) => !b.deleted);

  // 🔹 Apply search filter
  const filteredBlogs = visibleBlogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchText.toLowerCase()) ||
      b.author.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🔹 Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Blogs</h1>

      <BlogTable blogs={paginatedBlogs} onDelete={handleDelete} />

      {totalPages > 1 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
