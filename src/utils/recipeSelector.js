import { recipes } from '../data/recipes';

export function pickRecipeForDay(cuisine, activeFilters, excludeId = null) {
  if (!cuisine) return null;

  const pool = recipes.filter(r => r.cuisine === cuisine);
  if (pool.length === 0) return null;

  const filtered = pool.filter(r => {
    if (r.id === excludeId) return false;
    return activeFilters.every(f => matchesFilter(r, f));
  });

  const candidates = filtered.length > 0 ? filtered : fallback(pool, activeFilters, excludeId);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function matchesFilter(recipe, filter) {
  switch (filter) {
    case '30 mins or less':
      return recipe.prepTime <= 30;
    case '10 ingredients or less':
      return recipe.ingredients.length <= 10;
    case 'Vegan':
      return recipe.tags.includes('Vegan');
    case 'Vegetarian':
      return recipe.tags.includes('Vegetarian') || recipe.tags.includes('Vegan');
    case 'Dairy Free':
      return recipe.tags.includes('Dairy Free') || recipe.tags.includes('Vegan');
    default:
      return recipe.tags.includes(filter);
  }
}

// Return the recipe(s) from pool that satisfy the most filters
function fallback(pool, activeFilters, excludeId) {
  const scored = pool
    .filter(r => r.id !== excludeId)
    .map(r => ({
      recipe: r,
      score: activeFilters.filter(f => matchesFilter(r, f)).length,
    }))
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return pool;

  const best = scored[0].score;
  return scored.filter(s => s.score === best).map(s => s.recipe);
}
