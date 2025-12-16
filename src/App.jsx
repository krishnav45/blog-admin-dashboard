import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        {(searchText) => (
          <Routes>
            <Route
              path="/"
              element={<Dashboard searchText={searchText} />}
            />
            <Route path="/add" element={<AddBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
        )}
      </Layout>
    </BrowserRouter>
  );
}
