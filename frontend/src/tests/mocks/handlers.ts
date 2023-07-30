import { rest } from "msw";
import { initialTodos } from "./data";
import { setupServer } from "msw/node";
import { sortTodos } from "../../utils/helper";

const handlers = [
  rest.patch("/api/todo/:id", (req: any, res: any, ctx: any) => {
    const id = Number(req.params.id);
    console.log(id);
    console.log(req.body);
    const newTodo = {
      id,
      done: req.body.done,
      updatedAt: new Date(),
    };
    console.log(newTodo);
    return res(
      ctx.json({
        status: "ok",
        todo: newTodo,
      }),
      ctx.delay(150)
    );
  }),
  rest.get("/api/todos", (req: any, res: any, ctx: any) => {
    console.log("get todos");
    const name = req.url.searchParams.get("name") || "";
    const onlyDone = (req.url.searchParams.get("done") || "") === "true";
    return res(
      ctx.json({
        status: "ok",
        todos: sortTodos({
          todo: initialTodos.filter((t) => {
            return t.label.includes(name) && t.done === onlyDone;
          }),
          includeDate: onlyDone,
        }),
      }),
      ctx.delay(150)
    );
  }),
];

export const server = setupServer(...handlers);
