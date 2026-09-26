import { ScenarioDefinition, TestVector } from './types';
import { formatCurrency } from '../engine/synthesizer';

export interface BankingInput {
  accountId: string;
  principal: number;
  apr: number;
  termDays: number;
  tier: 'RETAIL' | 'COMMERCIAL' | 'INSTITUTIONAL';
  withholdingTaxRate: number;
}

export interface BankingOutput {
  grossInterest: number;
  taxWithheld: number;
  netInterest: number;
  balanceFormatted: string;
  roundingModeUsed: string;
}

// Java BigDecimal HALF_EVEN banker's rounding to 2 decimal places
export function bankerRound(val: number): number {
  const scaled = Math.round(val * 1000) / 10;
  const floor = Math.floor(scaled);
  const diff = scaled - floor;

  if (Math.abs(diff - 0.5) < 1e-4) {
    // Exactly halfway: round to nearest even integer
    return (floor % 2 === 0 ? floor : floor + 1) / 100;
  }
  return Math.round(scaled) / 100;
}

export const bankingScenario: ScenarioDefinition = {
  id: 'banking',
  name: 'Commercial Banking Interest & Tax Engine',
  tag: 'COBOL / Java 8 ➔ TypeScript',
  domain: 'Financial Core Infrastructure',
  failureCost: '$42,500,000 Outage & Regulatory Audit Risk',
  oneLiner: 'Catches silent IEEE 754 floating-point rounding decay that causes millions in interest drift.',
  legacyLabel: 'Core Banking Mainframe v1.2.4 (COBOL/BigDecimal)',
  legacyLanguage: 'java',
  legacyCode: `// Legacy Java 8 Enterprise Core Banking (AccrualService.java)
public AccountAccrual calculateAccruedYield(BigDecimal principal, BigDecimal apr, int days) {
    BigDecimal dayFactor = BigDecimal.valueOf(days).divide(BigDecimal.valueOf(365), 16, RoundingMode.HALF_EVEN);
    BigDecimal rateFactor = apr.multiply(dayFactor, MathContext.DECIMAL128);
    BigDecimal grossInterest = principal.multiply(rateFactor).setScale(2, RoundingMode.HALF_EVEN);
    
    // Statutory withholding tax with exact Banker's Rounding
    BigDecimal tax = grossInterest.multiply(new BigDecimal("0.20")).setScale(2, RoundingMode.HALF_EVEN);
    BigDecimal netYield = grossInterest.subtract(tax);
    return new AccountAccrual(grossInterest, tax, netYield);
}`,
  modernLanguage: 'typescript',
  initialModernCode: `// IBM Bob 2.0 Initial Modernization (accrual.ts)
// ⚠️ VULNERABILITY: Standard IEEE-754 64-bit float math causes precision loss
export function calculateAccruedYield(principal: number, apr: number, days: number): Accrual {
  const dayFactor = days / 365;
  const rateFactor = apr * dayFactor;
  const grossInterest = Number((principal * rateFactor).toFixed(2)); // Naive round
  
  // Standard float tax calculation
  const tax = Number((grossInterest * 0.20).toFixed(2));
  const netYield = Number((grossInterest - tax).toFixed(2));
  return { grossInterest, tax, netYield };
}`,
  patchedModernCode: `// IBM Bob 2.0 Autonomous Patch (MCP Packet #1429 Applied)
// ✅ FIXED: High-precision basis-points with exact Banker's Rounding (HALF_EVEN)
export function calculateAccruedYield(principal: number, apr: number, days: number): Accrual {
  // Banker's Rounding (half-to-even) eliminates statistical rounding drift
  const rawYield = principal * apr * (days / 365);
  const gross = bankerRound(rawYield);
  const tax = bankerRound(gross * 0.20);
  const netYield = Number((gross - tax).toFixed(2));
  return { grossInterest: gross, tax, netYield };
}`,
  divergenceVectorIndex: 1429,
  divergenceExplanation:
    'Vector #1,429 ($1,250,000.00 at 4.2498% APR for 183 days) evaluates to exactly $26,634.425. Legacy COBOL Banker\'s Rounding rounds down to the nearest even cent ($26,634.42). Modern floating-point toFixed(2) rounds up to $26,634.43. Across high-volume institutional balances, this causes silent multi-dollar reconciliation drift.',
  bobPatchExplanation:
    'IBM Bob 2.0 consumed the Parity MCP Divergence Packet, identified the IEEE-754 toFixed() drift, and introduced a Banker\'s Rounding function matching ISO/IEC 10967-2 half-even arithmetic. Parity restored to 100.00%.',

  generateVectors: (count: number): TestVector<BankingInput>[] => {
    const vectors: TestVector<BankingInput>[] = [];

    for (let i = 0; i < count; i++) {
      let principal: number;
      let apr: number;
      let days: number;
      let tier: 'RETAIL' | 'COMMERCIAL' | 'INSTITUTIONAL';
      let category: 'nominal' | 'boundary' | 'adversarial' | 'extreme' = 'nominal';

      if (i === 1429) {
        // Targeted canonical divergence vector
        principal = 1250000;
        apr = 0.04249864535519126;
        days = 183;
        tier = 'INSTITUTIONAL';
        category = 'boundary';
      } else if (i < 1429) {
        // Nominal retail & commercial before divergence
        principal = 5000 + (i * 50);
        apr = 0.035 + ((i % 10) * 0.002);
        days = 365;
        tier = principal > 50000 ? 'COMMERCIAL' : 'RETAIL';
      } else if (i % 38 === 0) {
        // Repeated boundary condition after #1429
        principal = 1000000 + (i * 20);
        apr = 0.04249864535519126;
        days = 183;
        tier = 'INSTITUTIONAL';
        category = 'boundary';
      } else {
        // High volume retail
        principal = 10000 + (i * 15);
        apr = 0.04;
        days = 365;
        tier = 'COMMERCIAL';
      }

      vectors.push({
        index: i,
        input: {
          accountId: `ACT-${(100000 + i).toString()}`,
          principal,
          apr,
          termDays: days,
          tier,
          withholdingTaxRate: 0.2,
        },
        category,
        description: `${tier} Accrual: $${principal.toLocaleString()} at ${(apr * 100).toFixed(2)}% APR (${days}d)`,
      });
    }

    return vectors;
  },

  runVector: (input: BankingInput, isPatched: boolean) => {
    const { principal, apr, termDays } = input;
    const rawYield = principal * apr * (termDays / 365);

    // 1. Legacy Output: Exact Banker's Rounding (HALF_EVEN)
    const legacyGross = bankerRound(rawYield);
    const legacyTax = bankerRound(legacyGross * 0.2);
    const legacyNet = bankerRound(legacyGross - legacyTax);

    const legacy: BankingOutput = {
      grossInterest: legacyGross,
      taxWithheld: legacyTax,
      netInterest: legacyNet,
      balanceFormatted: formatCurrency(principal + legacyNet),
      roundingModeUsed: 'BigDecimal.ROUND_HALF_EVEN',
    };

    // 2. Modern Output
    let modernGross: number;
    let modernTax: number;
    let modernNet: number;
    let modeUsed: string;

    if (isPatched) {
      modernGross = bankerRound(rawYield);
      modernTax = bankerRound(modernGross * 0.2);
      modernNet = bankerRound(modernGross - modernTax);
      modeUsed = 'Bob2.0-FixedPoint-BankersRound';
    } else {
      modernGross = Number(rawYield.toFixed(2));
      modernTax = Number((modernGross * 0.2).toFixed(2));
      modernNet = Number((modernGross - modernTax).toFixed(2));
      modeUsed = 'Standard-JS-IEEE754-Float';
    }

    const modern: BankingOutput = {
      grossInterest: modernGross,
      taxWithheld: modernTax,
      netInterest: modernNet,
      balanceFormatted: formatCurrency(principal + modernNet),
      roundingModeUsed: modeUsed,
    };

    const isMatch =
      legacy.grossInterest === modern.grossInterest &&
      legacy.taxWithheld === modern.taxWithheld &&
      legacy.netInterest === modern.netInterest;

    let delta: string | undefined;
    if (!isMatch) {
      const diff = Math.abs(modern.grossInterest - legacy.grossInterest);
      delta = `Gross Interest Drift: +$${diff.toFixed(2)} (${legacy.grossInterest.toFixed(2)} vs ${modern.grossInterest.toFixed(2)})`;
    }

    return { legacy, modern, match: isMatch, isMatch, delta };
  },
};
