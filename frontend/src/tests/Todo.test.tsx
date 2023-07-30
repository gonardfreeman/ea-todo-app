import { screen } from "@testing-library/react";

import { renderWithProviders } from "./test-utils";
import { initialTodos } from "./mocks/data";
import { server } from "./mocks/handlers";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders the todo list correctly", async () => {
    renderWithProviders(<TodoList isDone={false} />);
    const todoLabelEl = await screen.findByText(initialTodos[0].label);
    expect(todoLabelEl).toBeInTheDocument();
  });

  it("renders only not checked", async () => {
    renderWithProviders(<TodoList isDone={false} />);

    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBe(
      initialTodos.filter((t) => t.done === false).length
    );
  });

  it("rendered To Do label", () => {
    renderWithProviders(<TodoList isDone={false} />);
    let todoLabel = screen.getByText("To Do");
    expect(todoLabel).toBeInTheDocument();
  });

  it("rendered Done label", () => {
    renderWithProviders(<TodoList isDone={true} />);
    let todoLabel = screen.getByText("Done");
    expect(todoLabel).toBeInTheDocument();
  });
});
