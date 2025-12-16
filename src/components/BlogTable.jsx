import { Link } from "react-router-dom";

export default function BlogTable({ blogs, onDelete }) {
  if (blogs.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No blogs found
      </p>
    );
  }

  return (
    <>
      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="p-2">{blog.title}</td>
                <td className="p-2">{blog.author}</td>
                <td className="p-2">{blog.category}</td>
                <td className="p-2">{blog.status}</td>
                <td className="p-2 space-x-3">
                  <Link
                    to={`/edit/${blog.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(blog.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="md:hidden space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">{blog.title}</p>
            <p className="text-sm text-gray-600">
              Author: {blog.author}
            </p>
            <p className="text-sm text-gray-600">
              Category: {blog.category}
            </p>
            <p className="text-sm text-gray-600">
              Status: {blog.status}
            </p>

            <div className="mt-2 flex gap-4">
              <Link
                to={`/edit/${blog.id}`}
                className="text-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(blog.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
