import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { getTodos, getCompletedTodos } from "./todoHandler";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Example API endpoint
app.get("/api/todos", async (req: Request, res: Response) => {
  const name = req.query.name || "";
  const onlyDone = (req.query.done || "") === "true";
  try {
    if (onlyDone) {
      const done = await getCompletedTodos(name as string);
      res.json({ status: "ok", todos: done });
      return;
    }
    const todos = await getTodos(name as string);
    res.json({ status: "ok", todos });
  } catch (err) {
    res.json({ status: "error", todos: [] });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
