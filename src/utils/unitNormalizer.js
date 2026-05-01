const WEIGHT_TO_G = { g: 1, kg: 1000, oz: 28.3495, lb: 453.592 };
const VOL_TO_ML = { ml: 1, cup: 236.588, tbsp: 14.787, tsp: 4.929 };

export function toBaseUnit(qty, unit) {
  if (WEIGHT_TO_G[unit] !== undefined) return { qty: qty * WEIGHT_TO_G[unit], baseUnit: 'g' };
  if (VOL_TO_ML[unit] !== undefined) return { qty: qty * VOL_TO_ML[unit], baseUnit: 'ml' };
  return { qty, baseUnit: unit };
}

export function fromBaseUnit(qty, baseUnit) {
  if (baseUnit === 'g') {
    if (qty >= 900) return { qty: round(qty / 1000, 2), unit: 'kg' };
    if (qty >= 28) return { qty: round(qty / 453.592, 2), unit: 'lb' };
    return { qty: round(qty, 1), unit: 'g' };
  }
  if (baseUnit === 'ml') {
    if (qty >= 60) return { qty: round(qty / 236.588, 2), unit: 'cup' };
    if (qty >= 14) return { qty: round(qty / 14.787, 1), unit: 'tbsp' };
    return { qty: round(qty / 4.929, 1), unit: 'tsp' };
  }
  return { qty: round(qty, 2), unit: baseUnit };
}

function round(n, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}
