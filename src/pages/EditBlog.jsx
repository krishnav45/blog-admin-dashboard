import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import useLocalStorage from "../hooks/useLocalStorage";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useLocalStorage("blogs", []);

  const blogToEdit = blogs.find((b) => b.id === Number(id));

  function handleUpdate(updatedData) {
    const updatedBlogs = blogs.map((b) =>
      b.id === Number(id) ? { ...b, ...updatedData } : b
    );

    setBlogs(updatedBlogs);
    navigate("/");
  }

  if (!blogToEdit) {
    return <p className="text-red-500">Blog not found</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Blog</h1>
      <BlogForm initialData={blogToEdit} onSubmit={handleUpdate} />
    </div>
  );
}
