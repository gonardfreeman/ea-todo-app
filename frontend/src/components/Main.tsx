import Controls from "./Controls";
import TodoList from "./TodoList";

export default function Main() {
  return (
    <main className="px-6 mt-6">
      <Controls />
      <div className="grid grid-cols-2 gap-16">
        <TodoList isDone={false} />
        <TodoList isDone={true} />
      </div>
    </main>
  );
}
