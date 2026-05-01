export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500 text-white text-xl font-bold select-none">
          🥗
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Weekly Meal Planner</h1>
          <p className="text-sm text-gray-500">Build your week, generate your grocery list</p>
        </div>
      </div>
    </header>
  );
}
