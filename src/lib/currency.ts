/**
 * IPL Auction Currency & Bid Increment Logic
 * All monetary amounts are handled as integer rupees to prevent floating point inaccuracies.
 */

export const CRORE = 10000000;
export const LAKH = 100000;

/**
 * Formats integer rupees into readable IPL auction currency string (Crores / Lakhs)
 * @param amountInRupees e.g. 20000000
 * @returns e.g. "₹2.00 Cr" or "₹50 L"
 */
export function formatRupees(amountInRupees: number | bigint): string {
  const num = typeof amountInRupees === 'bigint' ? Number(amountInRupees) : amountInRupees;
  if (!num || num === 0) return '₹0';

  if (Math.abs(num) >= CRORE) {
    const cr = num / CRORE;
    // Format to 2 decimal places, but strip trailing .00 if clean integer
    const formatted = cr.toFixed(2).replace(/\.00$/, '');
    return `₹${formatted} Cr`;
  }

  if (Math.abs(num) >= LAKH) {
    const lk = num / LAKH;
    const formatted = lk.toFixed(2).replace(/\.00$/, '');
    return `₹${formatted} L`;
  }

  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Calculates the next minimum bid amount based on the current bid and official IPL price bands.
 * Official Bands:
 * - Current Bid = 0 (Opening): Base Price
 * - Current Bid < 2 Cr: +10 Lakhs (+₹0.10 Cr)
 * - Current Bid >= 2 Cr: +25 Lakhs (+₹0.25 Cr)
 */
export function getNextMinimumBid(currentBid: number, basePrice: number): number {
  if (currentBid <= 0) {
    return basePrice;
  }

  if (currentBid < 2 * CRORE) {
    return currentBid + 10 * LAKH;
  }
  return currentBid + 25 * LAKH;
}

/**
 * Returns the official incremental amount in rupees for the current bid level.
 */
export function getBidIncrement(currentBid: number, basePrice: number = 0): number {
  if (currentBid <= 0) {
    return basePrice;
  }
  if (currentBid < 2 * CRORE) {
    return 10 * LAKH;
  }
  return 25 * LAKH;
}

/**
 * Returns a human-readable badge label for the active increment (e.g. "+₹10L" or "+₹25L")
 */
export function getBidIncrementLabel(currentBid: number): string {
  if (currentBid <= 0) {
    return 'Opening Base Price';
  }
  if (currentBid < 2 * CRORE) {
    return '+₹10 Lakhs (Official Increment)';
  }
  return '+₹25 Lakhs (Official Increment)';
}

/**
 * Returns available quick-raise increments that a bidder can choose from
 */
export function getQuickBidOptions(currentBid: number, basePrice: number, remainingPurse: number): number[] {
  const minBid = getNextMinimumBid(currentBid, basePrice);
  if (minBid > remainingPurse) return [];
  return [minBid];
}
