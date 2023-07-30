import { SimpleTodo } from "../store/todoSlice";

export const sortTodos = ({
  todo,
  includeDate,
}: {
  todo: SimpleTodo[];
  includeDate: boolean;
}) => {
  return todo.sort((a, b) => {
    if (includeDate && a.updatedAt > b.updatedAt) {
      return -1;
    }
    if (includeDate && a.updatedAt < b.updatedAt) {
      return 1;
    }

    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }

    return 0;
  });
};
