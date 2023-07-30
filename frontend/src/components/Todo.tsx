import { ChangeEvent } from "react";
import { useAppDispatch } from "../store/hooks";
import { SimpleTodo, toggleTodo } from "../store/todoSlice";
import type { SingleTodoResp } from "../utils/responses";

export default function Todo({ todo }: { todo: SimpleTodo }) {
  const dispatch = useAppDispatch();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { checked },
    } = e;
    try {
      const resp = await fetch(`/api/todo/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: checked,
        }),
      });
      const updatedTodoResponse: SingleTodoResp = await resp.json();
      if (updatedTodoResponse.status === "error" || !updatedTodoResponse.todo) {
        console.log(updatedTodoResponse.error);
        return;
      }
      dispatch(toggleTodo(updatedTodoResponse.todo));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <label className="text-sm text-slate-800 flex gap-4">
      <input
        type="checkbox"
        checked={todo.done}
        name={`${todo.id}`}
        onChange={handleChange}
      />
      <span>{todo.label}</span>
    </label>
  );
}
