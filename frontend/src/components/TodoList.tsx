import { useEffect } from "react";
import { loadInitialTodos } from "../store/completeTodoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SimpleTodo } from "../store/completeTodoSlice";

export type GetTodosResp = {
  todos: SimpleTodo[];
  status: "ok" | "error";
};

export default function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoReducer.todos);
  const search = useAppSelector((state) => state.todoReducer.search);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const resp = await fetch(`/api/todos`);
        const todos: GetTodosResp = await resp.json();
        dispatch(loadInitialTodos(todos.todos));
      } catch (err) {
        console.error(err);
      }
    };
    getTodos();
  }, [search, dispatch]);
  return (
    <div>
      <h2 className="border-b text-3xl border-black pb-2">To Do</h2>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.label}</div>
      ))}
    </div>
  );
}
