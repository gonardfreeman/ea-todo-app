import { Todo } from "@prisma/client";
import prisma from "../prisma/prisma";

export type SimpleTodo = Omit<
  Pick<Todo, "id" | "done" | "label" | "updatedAt">,
  "updatedAt"
> & { updatedAt: Date | string | number };

const selectFields = {
  id: true,
  label: true,
  done: true,
  updatedAt: true,
};

export async function getTodos(name: string, done: boolean) {
  try {
    return await prisma.todo.findMany({
      select: selectFields,
      where: {
        label: {
          contains: name,
        },
        done,
      },
      orderBy: done
        ? [
            {
              updatedAt: "desc",
            },
            {
              label: "asc",
            },
          ]
        : [
            {
              label: "asc",
            },
          ],
      take: done ? 10 : undefined,
    });
  } catch (err) {
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
}

export async function createTodo({
  todo,
}: {
  todo: Pick<SimpleTodo, "label" | "done">;
}) {
  try {
    return await prisma.todo.create({
      select: selectFields,
      data: todo,
    });
  } catch (err) {
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
}

export async function updateTodo({
  todo,
}: {
  todo: Pick<SimpleTodo, "id" | "label" | "done">;
}) {
  try {
    const { id, ...rest } = todo;
    return await prisma.todo.update({
      select: selectFields,
      where: {
        id,
      },
      data: rest,
    });
  } catch (err) {
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
}

export async function deleteAll() {
  let result = false;
  try {
    await prisma.todo.deleteMany();
    result = true;
  } catch (err) {
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
  return result;
}
