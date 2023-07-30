import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SimpleTodo } from "../../../backend/src/todoHandler";
import { sortTodos } from "../utils/helper";

export { SimpleTodo };

export interface TodoListState {
  todos: SimpleTodo[];
  completeTodos: SimpleTodo[];
  search: string;
}

const initialState: TodoListState = {
  todos: [],
  completeTodos: [],
  search: "",
};

const todoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    loadInitialTodos: (state, action: PayloadAction<SimpleTodo[]>) => {
      state.todos = action.payload;
    },
    loadCompleteTodos: (state, action: PayloadAction<SimpleTodo[]>) => {
      state.completeTodos = action.payload;
    },
    addTodo: (state, action: PayloadAction<SimpleTodo>) => {
      state.todos.push(action.payload);
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleTodo: (state, action: PayloadAction<SimpleTodo>) => {
      const todo = action.payload;
      const index = state.todos.findIndex((t) => t.id === todo.id);
      const completeIndex = state.completeTodos.findIndex(
        (t) => t.id === todo.id
      );
      if (index < 0 && completeIndex < 0) {
        // do we need to throw error?
        return;
      }
      if (todo.done) {
        state.todos.splice(index, 1);
        state.completeTodos = [
          todo,
          ...sortTodos({ todo: state.completeTodos, includeDate: false }),
        ];
        return;
      }
      state.completeTodos.splice(completeIndex, 1);
      state.todos = [
        ...sortTodos({ todo: state.todos, includeDate: false }),
        todo,
      ];
    },
  },
});

export const {
  addTodo,
  loadInitialTodos,
  loadCompleteTodos,
  toggleTodo,
  updateSearch,
} = todoSlice.actions;
export default todoSlice.reducer;
