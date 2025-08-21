export default function Header({ onLogout }) {
  return (
    <header className="bg-black text-white p-3 shadow d-flex justify-content-between align-items-center">
      <h1 className="text-2xl font-bold">Notes Keeper</h1>
      <button className="btn btn-sm btn-warning" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}
