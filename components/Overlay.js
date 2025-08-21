import { useState, useEffect } from "react";

export default function Overlay({ note, onSave, onDelete, onClose }) {
  const [localNote, setLocalNote] = useState(note);

  useEffect(() => {
    setLocalNote(note);
  }, [note]);

  if (!note) return null;

  function handleClose() {
    onSave(localNote);
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-white p-4 rounded shadow-lg"
        style={{ width: "90%", maxWidth: "600px" }}
      >
        <input
          className="form-control mb-2 fw-bold"
          placeholder="Note title"
          value={localNote.title}
          onChange={(e) =>
            setLocalNote({ ...localNote, title: e.target.value })
          }
        />
        <textarea
          className="form-control mb-2"
          placeholder="Note content"
          rows="8"
          value={localNote.content}
          onChange={(e) =>
            setLocalNote({ ...localNote, content: e.target.value })
          }
        ></textarea>
        <small className="text-muted d-block mb-3">
          Created at: {new Date(localNote.createdAt).toLocaleString()}
        </small>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger"
            onClick={() => onDelete(localNote._id)}
          >
            Delete
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
