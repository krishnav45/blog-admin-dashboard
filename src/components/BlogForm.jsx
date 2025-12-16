import { useState, useMemo } from "react";
import { validateImage } from "../utils/validators";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  author: "",
  image: "",
  date: "",
  status: "Draft",
};

export default function BlogForm({ onSubmit, initialData }) {
  // ✅ Initialize state safely (lint-safe)
  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    ...initialData,
  }));
  const [imageError, setImageError] = useState("");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle image upload + preview + validation
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const result = validateImage(file);
    if (!result.valid) {
      setImageError(result.message);
      return;
    }

    setImageError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  // ✅ Check if form changed (disable Save button if not)
  const isDirty = useMemo(() => {
    if (!initialData) return true; // Add form always enabled
    return Object.keys(EMPTY_FORM).some(
      (key) => form[key] !== (initialData[key] || EMPTY_FORM[key])
    );
  }, [form, initialData]);

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-lg space-y-3"
    >
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        className="border p-2 w-full"
      />

      {imageError && (
        <p className="text-red-500 text-sm">{imageError}</p>
      )}

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="h-32 object-cover rounded border"
        />
      )}

      {/* Save button disabled if form unchanged */}
      <button
        type="submit"
        disabled={!isDirty}
        className={`px-4 py-2 rounded text-white ${
          isDirty ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save Blog
      </button>
    </form>
  );
}
