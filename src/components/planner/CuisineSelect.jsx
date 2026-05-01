import { CUISINES } from '../../data/constants';

export default function CuisineSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent cursor-pointer"
    >
      <option value="">— Pick a cuisine —</option>
      {CUISINES.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
