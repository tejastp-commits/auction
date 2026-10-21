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
 * Calculates the next minimum bid amount based on the current bid and standard IPL price bands.
 * Standard Bands:
 * - Current Bid = 0 (Opening): Base Price
 * - Current Bid < 1 Cr: +20 Lakhs
 * - Current Bid >= 1 Cr and < 5 Cr: +25 Lakhs
 * - Current Bid >= 5 Cr and < 10 Cr: +50 Lakhs
 * - Current Bid >= 10 Cr: +1 Crore
 */
export function getNextMinimumBid(currentBid: number, basePrice: number): number {
  if (currentBid <= 0) {
    return basePrice;
  }

  if (currentBid < 1 * CRORE) {
    return currentBid + 20 * LAKH;
  }
  if (currentBid < 5 * CRORE) {
    return currentBid + 25 * LAKH;
  }
  if (currentBid < 10 * CRORE) {
    return currentBid + 50 * LAKH;
  }
  return currentBid + 1 * CRORE;
}

/**
 * Returns available quick-raise increments that a bidder can choose from
 */
export function getQuickBidOptions(currentBid: number, basePrice: number, remainingPurse: number): number[] {
  const minBid = getNextMinimumBid(currentBid, basePrice);
  if (minBid > remainingPurse) return [];

  const options = [minBid];

  // Additional strategic raise buttons
  const standardInc = minBid - (currentBid || basePrice);
  const bump1 = minBid + Math.max(standardInc, 25 * LAKH);
  if (bump1 <= remainingPurse && !options.includes(bump1)) {
    options.push(bump1);
  }

  const bump2 = minBid + Math.max(standardInc * 2, 50 * LAKH);
  if (bump2 <= remainingPurse && !options.includes(bump2)) {
    options.push(bump2);
  }

  const bump3 = minBid + 1 * CRORE;
  if (bump3 <= remainingPurse && !options.includes(bump3)) {
    options.push(bump3);
  }

  return options.slice(0, 4);
}
