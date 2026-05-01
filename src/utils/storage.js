import { recipes } from '../data/recipes';

const KEY = 'rwc-meal-planner-v1';

export function saveState(weekPlan, servings, activeFilters) {
  const compact = {};
  Object.entries(weekPlan).forEach(([day, { cuisine, recipe }]) => {
    compact[day] = { cuisine, recipeId: recipe?.id ?? null };
  });
  localStorage.setItem(KEY, JSON.stringify({ weekPlan: compact, servings, activeFilters }));
}

export function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw) return null;
    const weekPlan = {};
    Object.entries(raw.weekPlan).forEach(([day, { cuisine, recipeId }]) => {
      const recipe = recipes.find(r => r.id === recipeId) ?? null;
      weekPlan[day] = { cuisine, recipe };
    });
    return { weekPlan, servings: raw.servings, activeFilters: raw.activeFilters };
  } catch {
    return null;
  }
}

export function clearState() {
  localStorage.removeItem(KEY);
}
