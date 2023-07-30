export default function Controls() {
  return (
    <div className="flex justify-between w-full my-6">
      <div className="flex gap-4">
        <input type="text" className="border rounded-lg px-4 py-2" />
        <button className="border rounded-md px-4 py-2 bg-custom-blue">
          Add
        </button>
      </div>
      <input type="text" className="border rounded-lg px-4 py-2" />
    </div>
  );
}
