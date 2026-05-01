export default function IngredientRow({ name, qty, unit }) {
  const displayUnit = unit === 'whole' ? '' : unit;
  const displayQty = qty > 0 ? qty : '';

  return (
    <li className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
      <span className="text-sm text-gray-700">
        {displayQty && (
          <span className="font-semibold text-gray-900 mr-1">
            {displayQty}{displayUnit && ` ${displayUnit}`}
          </span>
        )}
        {name}
      </span>
    </li>
  );
}
