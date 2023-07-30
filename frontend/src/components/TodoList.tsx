import { useEffect } from "react";
import { loadInitialTodos, loadCompleteTodos } from "../store/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { GetTodosResp } from "../utils/responses";
import Todo from "./Todo";

export default function TodoList({ isDone }: { isDone: boolean }) {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => {
    if (isDone) {
      return state.todo.completeTodos;
    }
    return state.todo.todos;
  });
  const search = useAppSelector((state) => state.todo.search);
  const action = isDone ? loadCompleteTodos : loadInitialTodos;
  useEffect(() => {
    const getTodos = async () => {
      try {
        const resp = await fetch(`/api/todos?done=${isDone}&name=${search}`);
        const todos: GetTodosResp = await resp.json();
        dispatch(action(todos.todos));
      } catch (err) {
        console.error(err);
      }
    };
    getTodos();
  }, [search, action, dispatch, isDone]);
  return (
    <div>
      <h2 className="border-b text-3xl border-black pb-2">
        {isDone ? "Done" : "To Do"}
      </h2>
      <ul className="px-2 py-4">
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
