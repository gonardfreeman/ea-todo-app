import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { getTodos, createTodo, updateTodo, deleteAll } from "./todoHandler";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/todos", async (req: Request, res: Response) => {
  const name = req.query.name || "";
  const onlyDone = (req.query.done || "") === "true";
  try {
    const todos = await getTodos(name as string, onlyDone);
    res.json({ status: "ok", todos });
  } catch (err) {
    res.json({ status: "error", todos: [] });
  }
});

app.post("/api/todos", async (req: Request, res: Response) => {
  try {
    const todo = await createTodo({ todo: req.body });
    res.json({ status: "ok", todo });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

app.patch("/api/todo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.json({ status: "error", message: "wrong-id-type" });
    return;
  }
  try {
    const todo = await updateTodo({
      todo: {
        ...req.body,
        id,
      },
    });
    res.json({ status: "ok", todo });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

app.delete("/api/todos", async (req: Request, res: Response) => {
  try {
    const result = await deleteAll();
    res.json({ status: "ok", result });
  } catch (err) {
    res.json({ status: "error", result: false });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
