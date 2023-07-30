import { SimpleTodo } from "../../../backend/src/todoHandler";

type CommonStatus = "ok" | "error";

export type GetTodosResp = {
  todos: SimpleTodo[];
  status: CommonStatus;
};

export type SingleTodoResp = {
  todo?: SimpleTodo;
  status: CommonStatus;
  error?: any;
};
