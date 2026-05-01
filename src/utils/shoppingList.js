import { STORE_SECTIONS } from '../data/constants';
import { toBaseUnit, fromBaseUnit } from './unitNormalizer';

export function buildShoppingList(weekPlan, servings) {
  const merged = new Map();

  Object.values(weekPlan).forEach(({ recipe }) => {
    if (!recipe) return;
    const scale = servings / recipe.servingBase;

    recipe.ingredients.forEach(({ name, qty, unit, section }) => {
      const key = `${name.toLowerCase().trim()}__${section}`;
      const scaledQty = qty * scale;

      if (merged.has(key)) {
        const existing = merged.get(key);
        const a = toBaseUnit(existing.rawQty, existing.rawUnit);
        const b = toBaseUnit(scaledQty, unit);

        if (a.baseUnit === b.baseUnit) {
          const combined = fromBaseUnit(a.qty + b.qty, a.baseUnit);
          merged.set(key, { ...existing, rawQty: combined.qty, rawUnit: combined.unit });
        } else {
          // Different unit families — store as a second entry
          const altKey = `${key}__alt`;
          merged.set(altKey, { name, rawQty: scaledQty, rawUnit: unit, section });
        }
      } else {
        merged.set(key, { name, rawQty: scaledQty, rawUnit: unit, section });
      }
    });
  });

  const grouped = {};
  STORE_SECTIONS.forEach(s => { grouped[s] = []; });

  merged.forEach(({ name, rawQty, rawUnit, section }) => {
    const display = formatQty(rawQty, rawUnit);
    if (grouped[section]) {
      grouped[section].push({ name: capitalize(name), qty: display.qty, unit: display.unit });
    } else {
      if (!grouped['Misc']) grouped['Misc'] = [];
      grouped['Misc'].push({ name: capitalize(name), qty: display.qty, unit: display.unit });
    }
  });

  // Sort each section alphabetically and remove empty sections
  const result = {};
  STORE_SECTIONS.forEach(s => {
    if (grouped[s] && grouped[s].length > 0) {
      result[s] = grouped[s].sort((a, b) => a.name.localeCompare(b.name));
    }
  });

  return result;
}

function formatQty(qty, unit) {
  // Round to 2 decimal places; if whole number show as integer
  const rounded = Math.round(qty * 100) / 100;
  const display = rounded === Math.floor(rounded) ? Math.floor(rounded) : rounded;
  return { qty: display, unit };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
