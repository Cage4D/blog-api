import "../styles.css";
import { SignUp, Login, Home, CreatePost, EditPost, Drafts, PostView } from "./imports";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<EditPost />} />
      <Route path="/drafts" element={<Drafts />} />
      <Route path="/posts/:id" element={<PostView />} />
    </Routes>
  );
}
