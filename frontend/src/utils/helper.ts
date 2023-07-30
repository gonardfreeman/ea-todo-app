import { SimpleTodo } from "../store/todoSlice";

export const sortTodos = ({
  todo,
  includeDate,
}: {
  todo: SimpleTodo[];
  includeDate: boolean;
}) => {
  return todo.sort((a, b) => {
    let aUpdatedAt =
      a.updatedAt instanceof Date ? a.updatedAt : new Date(a.updatedAt);
    let bUpdatedAt =
      b.updatedAt instanceof Date ? b.updatedAt : new Date(b.updatedAt);
    if (includeDate && aUpdatedAt > bUpdatedAt) {
      return -1;
    }
    if (includeDate && aUpdatedAt < bUpdatedAt) {
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
