export default function Header() {
  return (
    <header className="h-16">
      <div className="flex justify-between px-6 py-4">
        <h1 className="flex justify-between px-6 py-4">Todo App</h1>
        <button className="text-blue-700 hover:underline focus:outline-none">
          Delete All
        </button>
      </div>
    </header>
  );
}
