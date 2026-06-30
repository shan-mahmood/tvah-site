/**
 * Single source of truth for visit fees.
 *
 * These figures are surfaced on the /walk-ins page and /hospital-policies and
 * MUST stay identical across both. Change a price here and every surface
 * updates. Never retype the numbers or labels inline; import from this module.
 */

export type Fee = {
  label: string
  price: number
}

export const WALK_IN_EXAM: Fee = {
  label: 'Walk-in exam (non-emergency)',
  price: 150,
}

export const EMERGENCY_VISIT: Fee = {
  label: 'Emergency visit',
  price: 200,
}

/** Formats a whole-dollar fee, e.g. 150 -> "$150". */
export function formatPrice(price: number): string {
  return `$${price}`
}
