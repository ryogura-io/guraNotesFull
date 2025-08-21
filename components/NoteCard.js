export default function NoteCard({ note, onClick }) {
  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
  }

  return (
    <div
      className="noteCard bg-white p-3 shadow-sm rounded h-100 cursor-pointer"
      style={{ transition: "transform 0.3s ease" }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h5 className="fw-bold">{note.title || "(No title)"}</h5>
      <p className="text-truncate">{note.content || "(Empty note)"}</p>
      <small className="text-muted">Created: {formatDate(note.createdAt)}</small>
    </div>
  );
}
