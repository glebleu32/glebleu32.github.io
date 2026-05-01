import IngredientRow from './IngredientRow';

const SECTION_ICONS = {
  'Produce': '🥬',
  'Meat': '🥩',
  'Seafood': '🐟',
  'Dairy & Eggs': '🧀',
  'Grains & Bread': '🌾',
  'Canned Goods': '🥫',
  'Condiments & Spices': '🧂',
  'Frozen': '❄️',
  'Misc': '🛒',
};

export default function StoreSection({ sectionName, items }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
        <span className="text-lg">{SECTION_ICONS[sectionName] || '🛒'}</span>
        <h3 className="font-semibold text-gray-800 text-sm">{sectionName}</h3>
        <span className="ml-auto text-xs text-gray-400">{items.length} items</span>
      </div>
      <div className="px-4 py-2">
        <ul>
          {items.map((item, i) => (
            <IngredientRow key={i} name={item.name} qty={item.qty} unit={item.unit} />
          ))}
        </ul>
      </div>
    </div>
  );
}
