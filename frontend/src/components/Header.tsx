import { loadCompleteTodos, loadInitialTodos } from "../store/todoSlice";
import { useAppDispatch } from "../store/hooks";
import { DeleteTodoResp } from "../utils/responses";

export default function Header() {
  const dispatch = useAppDispatch();
  const handleDeleteAll = async () => {
    try {
      const resp = await fetch("/api/todos", {
        method: "DELETE",
      });
      const todoResp: DeleteTodoResp = await resp.json();
      if (!todoResp.result) {
        return;
      }
      dispatch(loadCompleteTodos([]));
      dispatch(loadInitialTodos([]));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="h-16">
      <div className="flex justify-between px-6 py-4">
        <h1 className="text-4xl text-slate-800">Todo App</h1>
        <button
          className="text-blue-700 hover:underline focus:outline-none"
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
      </div>
    </header>
  );
}
