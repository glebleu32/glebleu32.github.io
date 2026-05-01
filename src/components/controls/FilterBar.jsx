import FilterChip from '../common/FilterChip';
import { DIETARY_FILTERS } from '../../data/constants';

export default function FilterBar({ activeFilters, onToggleFilter }) {
  return (
    <div className="controls-bar bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Dietary Filters
        </p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_FILTERS.map(filter => (
            <FilterChip
              key={filter}
              label={filter}
              active={activeFilters.includes(filter)}
              onClick={() => onToggleFilter(filter)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
