// pages/notes.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteCard from "../components/NoteCard";
import Overlay from "../components/Overlay";
import {
  apiFetchNotes,
  apiCreateNote,
  apiUpdateNote,
  apiDeleteNote,
  getToken,
  clearToken,
} from "../lib/api";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const year = new Date().getFullYear();
  const hour = new Date().getHours();
  let greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    if (getToken()) loadNotes();
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
    if (!localNote) return; // ✅ guard
    const updated = await apiUpdateNote(
      localNote._id,
      localNote.title,
      localNote.content
    );
    setNotes((prev) =>
      prev.map((n) => (n._id === updated._id ? updated : n))
    );
    setSelectedNote(null); // close overlay after save
  }

  async function deleteNote(id) {
    if (!id) return; // ✅ guard
    await apiDeleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
    setSelectedNote(null);
  }

  function logout() {
    clearToken();
    setNotes([]);
    setSelectedNote(null);
    window.location.href = "/login"; // redirect to login
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

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-dark" onClick={createNote}>
          + Add Note
        </button>
      </div>


      <Footer />

      {/* ✅ Overlay only renders if a note is selected */}
      {selectedNote && (
        <Overlay
          note={selectedNote}
          onSave={saveNote}
          onDelete={deleteNote}
        />
      )}
    </div>
  );
}
