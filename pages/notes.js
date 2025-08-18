import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getToken,
  clearToken,
  apiFetchNotes,
  apiCreateNote,
  apiUpdateNote,
  apiDeleteNote,
} from "../lib/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteCard from "../components/NoteCard";
import Overlay from "../components/Overlay";

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const year = new Date().getFullYear();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      loadNotes();
    }
  }, []);

  async function loadNotes() {
    setLoading(true);
    const res = await apiFetchNotes();
    setLoading(false);
    if (Array.isArray(res)) setNotes(res);
    else alert(res.error || "Failed to load notes");
  }

  async function createNote() {
    const note = await apiCreateNote("", "");
    if (note && note._id) {
      setNotes((prev) => [note, ...prev]);
      setSelectedNote(note);
    }
  }

  async function saveNote(localNote) {
    const updated = await apiUpdateNote(
      localNote._id,
      localNote.title,
      localNote.content
    );
    setNotes((prev) =>
      prev.map((n) => (n._id === updated._id ? updated : n))
    );
    setSelectedNote(null);
  }

  async function deleteNote(id) {
    await apiDeleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
    setSelectedNote(null);
  }

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <div className="body bg-gray-100 min-vh-100">
      <Header onLogout={logout} />
      <h1 className="greeting p-1 pt-2">{greeting}!</h1>

      {loading && <p className="text-center">Loading notes...</p>}

      <div className="container px-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {notes.map((note) => (
            <div className="col" key={note._id}>
              <NoteCard note={note} onClick={() => setSelectedNote(note)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="btn btn-dark" onClick={createNote}>
          + Add Note
        </button>
      </div>

      <Footer year={year} />

      <Overlay
        note={selectedNote}
        onSave={saveNote}
        onDelete={deleteNote}
        onClose={() => setSelectedNote(null)}
      />
    </div>
  );
}
