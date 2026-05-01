import { useState, useEffect } from 'react';
import { DAYS } from './data/constants';
import { pickRecipeForDay } from './utils/recipeSelector';
import { saveState, loadState, clearState } from './utils/storage';
import Header from './components/layout/Header';
import FilterBar from './components/controls/FilterBar';
import ServingInput from './components/controls/ServingInput';
import WeekPlanner from './components/planner/WeekPlanner';
import ShoppingList from './components/shopping/ShoppingList';

const initialWeekPlan = () =>
  Object.fromEntries(DAYS.map(day => [day, { cuisine: '', recipe: null }]));

function initState() {
  const saved = loadState();
  if (saved) return saved;
  return { weekPlan: initialWeekPlan(), servings: 4, activeFilters: [] };
}

const { weekPlan: savedPlan, servings: savedServings, activeFilters: savedFilters } = initState();

export default function App() {
  const [servings, setServings] = useState(savedServings);
  const [activeFilters, setActiveFilters] = useState(savedFilters);
  const [weekPlan, setWeekPlan] = useState(savedPlan);
  const [showShopping, setShowShopping] = useState(false);

  useEffect(() => {
    saveState(weekPlan, servings, activeFilters);
  }, [weekPlan, servings, activeFilters]);

  const handleCuisineChange = (day, cuisine) => {
    const recipe = cuisine ? pickRecipeForDay(cuisine, activeFilters) : null;
    setWeekPlan(prev => ({ ...prev, [day]: { cuisine, recipe } }));
  };

  const handleToggleFilter = (filter) => {
    const nextFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];

    setActiveFilters(nextFilters);

    setWeekPlan(prev => {
      const next = { ...prev };
      DAYS.forEach(day => {
        if (prev[day].cuisine) {
          next[day] = {
            cuisine: prev[day].cuisine,
            recipe: pickRecipeForDay(prev[day].cuisine, nextFilters),
          };
        }
      });
      return next;
    });
  };

  const handleRegenerate = (day) => {
    const { cuisine, recipe } = weekPlan[day];
    const newRecipe = pickRecipeForDay(cuisine, activeFilters, recipe?.id);
    setWeekPlan(prev => ({ ...prev, [day]: { cuisine, recipe: newRecipe } }));
  };

  const handleNewWeek = () => {
    if (!window.confirm('Start a new week? This will clear your current plan.')) return;
    clearState();
    setWeekPlan(initialWeekPlan());
    setServings(4);
    setActiveFilters([]);
    setShowShopping(false);
  };

  const plannedCount = Object.values(weekPlan).filter(d => d.recipe).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <FilterBar activeFilters={activeFilters} onToggleFilter={handleToggleFilter} />

      {/* Controls bar */}
      <div className="controls-bar bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <ServingInput servings={servings} onChange={setServings} />
          <div className="flex items-center gap-3">
            {plannedCount > 0 && (
              <button
                onClick={handleNewWeek}
                className="text-sm text-red-500 hover:text-red-600 font-medium no-print"
              >
                Start New Week
              </button>
            )}
            <button
              onClick={() => setShowShopping(s => !s)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors no-print
                ${showShopping
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-brand-500 text-white hover:bg-brand-600'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {showShopping ? 'View Week' : `Grocery List${plannedCount > 0 ? ` (${plannedCount})` : ''}`}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      {showShopping ? (
        <div className="pt-6">
          <ShoppingList weekPlan={weekPlan} servings={servings} />
        </div>
      ) : (
        <WeekPlanner
          weekPlan={weekPlan}
          servings={servings}
          onCuisineChange={handleCuisineChange}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  );
}
