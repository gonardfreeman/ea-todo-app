import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useAppDispatch } from "../store/hooks";
import { SingleTodoResp } from "../utils/responses";
import { addTodo, updateSearch } from "../store/todoSlice";

export default function Controls() {
  const dispatch = useAppDispatch();
  const [todoLabel, setTodoLabel] = useState("");
  const [disabledAddButton, setDisabledButton] = useState(true);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTodoLabel(value);
    setDisabledButton(value.length < 1);
  };

  const handleAddTodo = async () => {
    if (disabledAddButton) {
      return;
    }
    try {
      const resp = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: todoLabel,
          done: false,
        }),
      });
      const createdTodoResponse: SingleTodoResp = await resp.json();
      if (createdTodoResponse.status === "error" || !createdTodoResponse.todo) {
        return;
      }
      dispatch(addTodo(createdTodoResponse.todo));
      setTodoLabel("");
      setDisabledButton(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    handleAddTodo();
  };

  let debounceTimeout: NodeJS.Timeout;
  const debounceInput = (value: string) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      dispatch(updateSearch(value));
    }, 500);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    debounceInput(value);
  };

  return (
    <div className="flex justify-between w-full my-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={todoLabel}
          onKeyUp={handleKeyUp}
          onChange={handleChangeLabel}
          className="border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleAddTodo}
          disabled={disabledAddButton}
          className="border rounded-md px-4 py-2 bg-custom-blue disabled:opacity-25 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          Add
        </button>
      </div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search..."
        className="border rounded-lg px-4 py-2"
      />
    </div>
  );
}
