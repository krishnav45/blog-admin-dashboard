import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AddBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useLocalStorage("blogs", []);

  function handleAddBlog(data) {
    const newBlog = {
      id: Date.now(),
      publishDate: new Date().toISOString().slice(0, 10),
      image: "",
      ...data,
    };

    setBlogs([...blogs, newBlog]);
    navigate("/");
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Blog</h1>
      <BlogForm onSubmit={handleAddBlog} />
    </div>
  );
}
