export default function ServingInput({ servings, onChange }) {
  const dec = () => onChange(Math.max(1, servings - 1));
  const inc = () => onChange(Math.min(12, servings + 1));

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-700">Servings</span>
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
        <button
          onClick={dec}
          className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors font-bold text-lg leading-none"
          aria-label="Decrease servings"
        >
          −
        </button>
        <span className="px-4 py-2 font-semibold text-gray-900 min-w-[2.5rem] text-center">
          {servings}
        </span>
        <button
          onClick={inc}
          className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors font-bold text-lg leading-none"
          aria-label="Increase servings"
        >
          +
        </button>
      </div>
    </div>
  );
}
