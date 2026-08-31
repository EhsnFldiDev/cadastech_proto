import { Property, Demand, SmartMatch } from './types';
import { formatTomanPrice } from './utils';

export function calculateMatchScore(
  property: Property,
  demand: Demand
): { score: number; reasons: string[]; mismatches: string[] } {
  // 1. Deal Type must match strictly
  if (property.dealType !== demand.dealType) {
    return { score: 0, reasons: [], mismatches: ['نوع معامله یکسان نیست (فروش / رهن و اجاره)'] };
  }

  let score = 0;
  const reasons: string[] = [];
  const mismatches: string[] = [];

  // 2. Neighborhood Matching (Max 30 pts)
  const isNeighborhoodMatch = demand.targetNeighborhoods.some(
    (n) => n.trim() === property.neighborhood.trim()
  );
  if (isNeighborhoodMatch) {
    score += 30;
    reasons.push(`تطابق محله درخواستی (${property.neighborhood})`);
  } else {
    mismatches.push(`محله متفاوت (${property.neighborhood})`);
  }

  // 3. Budget Matching (Max 30 pts)
  if (property.dealType === 'sale' && property.totalPrice) {
    const minBudget = demand.budgetMin || 0;
    const maxBudget = demand.budgetMax || Infinity;

    if (property.totalPrice >= minBudget && property.totalPrice <= maxBudget) {
      score += 30;
      reasons.push(`همخوانی دقیق بودجه (${formatTomanPrice(property.totalPrice)})`);
    } else if (
      property.totalPrice >= minBudget * 0.85 &&
      property.totalPrice <= (maxBudget === Infinity ? Infinity : maxBudget * 1.15)
    ) {
      score += 18;
      reasons.push(`نزدیک به بودجه خریدار (اختلاف کمتر از ۱۵٪)`);
    } else {
      mismatches.push('بودجه خارج از بازه پیشنهادی');
    }
  } else if (property.dealType === 'rent') {
    const propDeposit = property.depositPrice || 0;
    const propRent = property.monthlyRent || 0;
    const maxDeposit = demand.maxDeposit || Infinity;
    const maxRent = demand.maxMonthlyRent || Infinity;

    const depositOk = propDeposit <= maxDeposit * 1.1;
    const rentOk = propRent <= maxRent * 1.1;

    if (depositOk && rentOk) {
      score += 30;
      reasons.push(`همخوانی ودیعه و اجاره (${formatTomanPrice(propDeposit)} ودیعه / ${formatTomanPrice(propRent)} اجاره)`);
    } else if (depositOk || rentOk) {
      score += 18;
      reasons.push(`همخوانی نسبی ودیعه و اجاره (قابل تبدیل)`);
    } else {
      mismatches.push('ودیعه یا اجاره بالاتر از سقف تقاضا');
    }
  }

  // 4. Area / Metrazh Matching (Max 20 pts)
  if (property.area >= demand.minArea * 0.9) {
    if (!demand.maxArea || property.area <= demand.maxArea * 1.1) {
      score += 20;
      reasons.push(`متراژ ایده‌آل (${property.area} متر مربع)`);
    } else {
      score += 12;
      reasons.push(`متراژ مناسب با اختلاف جزئی`);
    }
  } else {
    mismatches.push(`متراژ کمتر از تقاضا (${property.area} متر در برابر حداقل ${demand.minArea} متر)`);
  }

  // 5. Bedroom Count Matching (Max 10 pts)
  if (property.bedrooms >= demand.minBedrooms) {
    score += 10;
    reasons.push(`تعداد خواب کافی (${property.bedrooms} خوابه)`);
  } else {
    mismatches.push(`تعداد خواب کمتر از حداقل درخواستی`);
  }

  // 6. Property Features & Amenities (Max 10 pts)
  let featuresCount = 0;
  if (property.hasParking) featuresCount++;
  if (property.hasElevator) featuresCount++;
  if (property.hasStorage) featuresCount++;
  if (property.hasBalcony) featuresCount++;

  if (featuresCount >= 3) {
    score += 10;
    reasons.push('فول امکانات (پارکینگ، آسانسور، انباری، بالکن)');
  } else if (featuresCount > 0) {
    score += 5;
  }

  // Cap score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, score));

  return {
    score: finalScore,
    reasons,
    mismatches
  };
}

export function generateAllSmartMatches(
  properties: Property[],
  demands: Demand[],
  minScoreThreshold: number = 60
): SmartMatch[] {
  const matches: SmartMatch[] = [];

  for (const property of properties) {
    if (property.status !== 'active') continue;

    for (const demand of demands) {
      if (demand.status !== 'active') continue;

      const { score, reasons, mismatches } = calculateMatchScore(property, demand);

      if (score >= minScoreThreshold) {
        matches.push({
          id: `match-${property.id}-${demand.id}`,
          propertyId: property.id,
          demandId: demand.id,
          property,
          demand,
          score,
          reasons,
          mismatches,
          createdAt: new Date().toLocaleDateString('fa-IR')
        });
      }
    }
  }

  // Sort by highest match score first
  return matches.sort((a, b) => b.score - a.score);
}
