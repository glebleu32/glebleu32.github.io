export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-all
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
        ${active
          ? 'bg-brand-100 border-brand-500 text-brand-700'
          : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-700'
        }
      `}
    >
      {active && <span className="mr-1 text-brand-500">✓</span>}
      {label}
    </button>
  );
}
