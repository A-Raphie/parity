import { ScenarioDefinition, TestVector } from './types';

export interface HealthcareInput {
  claimId: string;
  patientDob: string;
  claimDate: string;
  serviceCode: string;
  isCenturyYear: boolean;
  policyClass: 'MEDICARE_ADV' | 'COMMERCIAL_HMO' | 'TRICARE';
}

export interface HealthcareOutput {
  isEligible: boolean;
  exactAgeInDays: number;
  isLeapYearProcessed: boolean;
  gracePeriodExpiry: string;
  adjudicationStatus: 'APPROVED' | 'DENIED_EXPIRED' | 'REQUIRES_MANUAL_REVIEW';
}

function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const healthcareScenario: ScenarioDefinition = {
  id: 'healthcare',
  name: 'Healthcare Claims & Gregorian Century Boundary',
  tag: 'COBOL / C89 ➔ TypeScript',
  domain: 'Health Insurance Claims Adjudication',
  failureCost: '$18,200,000 Regulatory Compliance Fines & Denied Claims',
  oneLiner: 'Detects historical century leap-year calendar drift that drops valid Medicare eligibility.',
  legacyLabel: 'Adjudication Engine v4.8 (Mainframe C89 / COBOL)',
  legacyLanguage: 'c',
  legacyCode: `// Legacy Mainframe Adjudication (ClaimsCalendar.c)
int is_leap_year_astronomical(int year) {
    if (year % 4 != 0) return 0;
    if (year % 100 != 0) return 1;
    if (year % 400 == 0) return 1; // 2000 is leap; 1900, 2100 are NOT
    return 0;
}

int calculate_policy_days(int birth_year, int claim_year) {
    int total_days = 0;
    for (int y = birth_year; y < claim_year; y++) {
        total_days += is_leap_year_astronomical(y) ? 366 : 365;
    }
    return total_days;
}`,
  modernLanguage: 'typescript',
  initialModernCode: `// IBM Bob 2.0 Initial Modernization (calendar.ts)
// ⚠️ VULNERABILITY: Naive (year % 4 === 0) omits the 100-year Gregorian century rule
export function isLeapYear(year: number): boolean {
  return year % 4 === 0; // Bugs on 1900, 2100, 2200
}

export function calculatePolicyDays(birthYear: number, claimYear: number): number {
  let days = 0;
  for (let y = birthYear; y < claimYear; y++) {
    days += isLeapYear(y) ? 366 : 365;
  }
  return days;
}`,
  patchedModernCode: `// IBM Bob 2.0 Autonomous Patch (MCP Packet #840 Applied)
// ✅ FIXED: Restored strict 400-year astronomical Gregorian rules
export function isLeapYear(year: number): boolean {
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  return year % 400 === 0;
}

export function calculatePolicyDays(birthYear: number, claimYear: number): number {
  let days = 0;
  for (let y = birthYear; y < claimYear; y++) {
    days += isLeapYear(y) ? 366 : 365;
  }
  return days;
}`,
  divergenceVectorIndex: 840,
  divergenceExplanation:
    'Vector #840 tests a survivor policy with birth year 1898 and audit claim year 1904. The legacy mainframe correctly recognizes 1900 as a non-leap century year. The unpatched modern code evaluates 1900 % 4 === 0 as TRUE, introducing a ghost leap day. This 24-hour discrepancy causes an early Medicare milestone trigger and improper claims rejection.',
  bobPatchExplanation:
    'IBM Bob 2.0 consumed the Parity MCP Divergence Packet, identified the missing century modulo check, and restored the full astronomical 400-year Gregorian cycle rule.',

  generateVectors: (count: number): TestVector<HealthcareInput>[] => {
    const vectors: TestVector<HealthcareInput>[] = [];

    for (let i = 0; i < count; i++) {
      let birthYear: number;
      let claimYear: number;
      let isCenturyYear = false;
      let category: 'nominal' | 'boundary' | 'adversarial' | 'extreme' = 'nominal';

      if (i === 840) {
        // Targeted canonical divergence
        birthYear = 1898;
        claimYear = 1904;
        isCenturyYear = true;
        category = 'boundary';
      } else if (i < 840) {
        // Modern spans (1960 to 2024) where year % 4 matches Gregorian
        birthYear = 1960 + (i % 40);
        claimYear = birthYear + 20;
      } else if (i % 25 === 0) {
        // Repeated century spans across 1900
        birthYear = 1890 + (i % 10);
        claimYear = 1905;
        isCenturyYear = true;
        category = 'boundary';
      } else {
        // Standard spans
        birthYear = 1950 + (i % 50);
        claimYear = birthYear + 25;
      }

      vectors.push({
        index: i,
        input: {
          claimId: `CLM-${(500000 + i).toString()}`,
          patientDob: `${birthYear}-03-15`,
          claimDate: `${claimYear}-11-01`,
          serviceCode: 'CPT-99214',
          isCenturyYear,
          policyClass: birthYear < 1960 ? 'MEDICARE_ADV' : 'COMMERCIAL_HMO',
        },
        category,
        description: `Adjudication Span: ${birthYear} ➔ ${claimYear} (${claimYear - birthYear} yrs, Century: ${isCenturyYear})`,
      });
    }

    return vectors;
  },

  runVector: (input: HealthcareInput, isPatched: boolean) => {
    const birthYear = parseInt(input.patientDob.split('-')[0], 10);
    const claimYear = parseInt(input.claimDate.split('-')[0], 10);

    // 1. Legacy Mainframe Execution (Astronomical Gregorian)
    let legacyDays = 0;
    for (let y = birthYear; y < claimYear; y++) {
      legacyDays += isGregorianLeapYear(y) ? 366 : 365;
    }

    const legacyEligible = legacyDays >= 7300;
    const legacy: HealthcareOutput = {
      isEligible: legacyEligible,
      exactAgeInDays: legacyDays,
      isLeapYearProcessed: true,
      gracePeriodExpiry: `${claimYear}-12-31`,
      adjudicationStatus: legacyEligible ? 'APPROVED' : 'DENIED_EXPIRED',
    };

    // 2. Modern Execution
    let modernDays = 0;
    if (isPatched) {
      for (let y = birthYear; y < claimYear; y++) {
        modernDays += isGregorianLeapYear(y) ? 366 : 365;
      }
    } else {
      // Naive year % 4
      for (let y = birthYear; y < claimYear; y++) {
        const isLeap = y % 4 === 0;
        modernDays += isLeap ? 366 : 365;
      }
    }

    const modernEligible = modernDays >= 7300;
    const modern: HealthcareOutput = {
      isEligible: modernEligible,
      exactAgeInDays: modernDays,
      isLeapYearProcessed: isPatched,
      gracePeriodExpiry: `${claimYear}-12-31`,
      adjudicationStatus: modernEligible ? 'APPROVED' : 'DENIED_EXPIRED',
    };

    const isMatch =
      legacy.exactAgeInDays === modern.exactAgeInDays &&
      legacy.isEligible === modern.isEligible &&
      legacy.adjudicationStatus === modern.adjudicationStatus;

    let delta: string | undefined;
    if (!isMatch) {
      const dayDiff = modern.exactAgeInDays - legacy.exactAgeInDays;
      delta = `Ghost Day Drift: ${dayDiff > 0 ? '+' : ''}${dayDiff} day(s) (${legacy.exactAgeInDays} vs ${modern.exactAgeInDays})`;
    }

    return { legacy, modern, match: isMatch, isMatch, delta };
  },
};
