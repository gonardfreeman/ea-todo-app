import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SimpleTodo } from "../../../backend/src/todoHandler";

export { SimpleTodo };

export interface TodoListState {
  todos: SimpleTodo[];
  search: string;
}

const initialState: TodoListState = {
  todos: [],
  search: "",
};

const todoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    loadInitialTodos: (state, action: PayloadAction<SimpleTodo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { loadInitialTodos } = todoSlice.actions;
export default todoSlice.reducer;
