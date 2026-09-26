import { ScenarioDefinition, TestVector } from './types';

export interface SanctionInput {
  entityId: string;
  rawEntityName: string;
  originCountry: string;
  transactionAmountUsd: number;
  hasSpecialUnicode: boolean;
}

export interface SanctionOutput {
  normalizedQuery: string;
  isSanctionedMatch: boolean;
  matchedListId: string | null;
  riskScore: number;
  actionRequired: 'BLOCK_AND_FREEZE' | 'ALLOW_TRANSACTION' | 'FLAG_SECONDARY_SCREENING';
}

const RESTRICTED_ENTITIES = ['MULLER HOLDINGS', 'IZMIR SHIPPING', 'PETROKIMYA EXP', 'AL-QUDRA GENERAL', 'BELVNESH TRANS'];

function legacyNormalize(str: string): string {
  return str
    .replace(/ß/g, 'SS')
    .replace(/[üÜ]/g, 'U')
    .replace(/[öÖ]/g, 'O')
    .replace(/[äÄ]/g, 'A')
    .replace(/[İı]/g, 'I')
    .replace(/[éèêë]/g, 'E')
    .replace(/[áàâã]/g, 'A')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .trim();
}

export const sanctionsScenario: ScenarioDefinition = {
  id: 'sanctions',
  name: 'FinCEN Sanctions List & Unicode Normalization',
  tag: 'PL/I / Assembly ➔ TypeScript',
  domain: 'Anti-Money Laundering & OFAC Screening',
  failureCost: '$65,000,000 OFAC Enforcement Penalties & Asset Freezes',
  oneLiner: 'Catches unicode combining-mark and ligature bypasses in global AML wire screening.',
  legacyLabel: 'Screening Engine v3.1 (PL/I ASCII Transliteration)',
  legacyLanguage: 'c',
  legacyCode: `// Legacy FinCEN Screening (AmlNormalizer.pli)
NORMAL_ENTITY: PROCEDURE(RAW_STR) RETURNS(CHAR(128));
  DECLARE RAW_STR CHAR(128) VARYING;
  /* Mainframe strips German ß to SS, Turkish dotted I to I, accents stripped */
  CALL TRANSLATE_EXTENDED_ASCII(RAW_STR);
  RETURN(UPPER_CASE_CLEAN(RAW_STR));
END NORMAL_ENTITY;`,
  modernLanguage: 'typescript',
  initialModernCode: `// IBM Bob 2.0 Initial Modernization (sanctionFilter.ts)
// ⚠️ VULNERABILITY: Standard toUpperCase() fails on combining marks and Turkish dotted 'İ'
export function normalizeEntity(raw: string): string {
  return raw.toUpperCase().trim(); // Missing NFKD unicode decomposition & ASCII table
}

export function screenTransfer(entity: string): ScreeningResult {
  const norm = normalizeEntity(entity);
  const matched = RESTRICTED_ENTITIES.some(target => norm.includes(target));
  return { normalizedQuery: norm, isSanctionedMatch: matched };
}`,
  patchedModernCode: `// IBM Bob 2.0 Autonomous Patch (MCP Packet #620 Applied)
// ✅ FIXED: Unicode NFKD normalization + combining character strip matching legacy spec
export function normalizeEntity(raw: string): string {
  return raw
    .normalize('NFKD')
    .replace(/ß/g, 'SS')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/İ/g, 'I')
    .replace(/ı/g, 'I')
    .toUpperCase()
    .replace(/[^A-Z0-9\\s]/g, '')
    .trim();
}`,
  divergenceVectorIndex: 620,
  divergenceExplanation:
    'Vector #620 presents an international wire transfer to "İzmir Shipping & Trade". The legacy mainframe strips the Turkish dotted capital "İ" to plain "I", matching the OFAC-restricted entity "IZMIR SHIPPING" and freezing the funds. Unpatched modern JS .toUpperCase() preserves "İ" (U+0130), causing the screening check to return FALSE. An illicit transfer of $4,850,000 is allowed through undetected.',
  bobPatchExplanation:
    'IBM Bob 2.0 consumed the Parity MCP Divergence Packet, isolated the Unicode character divergence, and added canonical NFKD normalization with explicit multi-lingual folding.',

  generateVectors: (count: number): TestVector<SanctionInput>[] => {
    const vectors: TestVector<SanctionInput>[] = [];

    const standardNames = [
      'Global Alpha Trading',
      'Nordic Maritime Corp',
      'Pacific Standard Capital',
      'Apex Horizon Logistics',
      'Starlight Ventures LLC',
      'Crestview Asset Partners',
    ];

    for (let i = 0; i < count; i++) {
      let rawEntityName: string;
      let hasSpecialUnicode = false;
      let category: 'nominal' | 'boundary' | 'adversarial' | 'extreme' = 'nominal';

      if (i === 620) {
        // Targeted canonical divergence
        rawEntityName = 'İzmir Shipping & Trade';
        hasSpecialUnicode = true;
        category = 'boundary';
      } else if (i < 620) {
        // Standard ASCII names before divergence
        const base = standardNames[i % standardNames.length];
        rawEntityName = `${base} - Division ${(i % 50) + 1}`;
      } else if (i % 40 === 0) {
        // Turkish or German unicode cases after #620
        rawEntityName = i % 80 === 0 ? 'İzmir Shipping Logistics' : 'Müller Holdings AG';
        hasSpecialUnicode = true;
        category = 'boundary';
      } else {
        const base = standardNames[i % standardNames.length];
        rawEntityName = `${base} - Unit ${i + 100}`;
      }

      vectors.push({
        index: i,
        input: {
          entityId: `ENT-${(800000 + i).toString()}`,
          rawEntityName,
          originCountry: hasSpecialUnicode ? 'TR' : 'US',
          transactionAmountUsd: 250000 + (i * 100),
          hasSpecialUnicode,
        },
        category,
        description: `Entity Screening: "${rawEntityName}" (${hasSpecialUnicode ? 'Unicode Special' : 'Standard ASCII'})`,
      });
    }

    return vectors;
  },

  runVector: (input: SanctionInput, isPatched: boolean) => {
    const { rawEntityName } = input;

    // 1. Legacy Mainframe
    const legacyNorm = legacyNormalize(rawEntityName);
    const legacyMatch = RESTRICTED_ENTITIES.some((target) => legacyNorm.includes(target));

    const legacy: SanctionOutput = {
      normalizedQuery: legacyNorm,
      isSanctionedMatch: legacyMatch,
      matchedListId: legacyMatch ? 'OFAC-SDN-2026-X' : null,
      riskScore: legacyMatch ? 99.8 : 4.2,
      actionRequired: legacyMatch ? 'BLOCK_AND_FREEZE' : 'ALLOW_TRANSACTION',
    };

    // 2. Modern
    let modernNorm: string;
    if (isPatched) {
      modernNorm = legacyNormalize(rawEntityName);
    } else {
      modernNorm = rawEntityName.toUpperCase().trim();
    }

    const modernMatch = RESTRICTED_ENTITIES.some((target) => modernNorm.includes(target));
    const modern: SanctionOutput = {
      normalizedQuery: modernNorm,
      isSanctionedMatch: modernMatch,
      matchedListId: modernMatch ? 'OFAC-SDN-2026-X' : null,
      riskScore: modernMatch ? 99.8 : 4.2,
      actionRequired: modernMatch ? 'BLOCK_AND_FREEZE' : 'ALLOW_TRANSACTION',
    };

    const isMatch =
      legacy.isSanctionedMatch === modern.isSanctionedMatch &&
      legacy.actionRequired === modern.actionRequired;

    let delta: string | undefined;
    if (!isMatch) {
      delta = `Screening Discrepancy: Legacy=[${legacy.actionRequired}] vs Modern=[${modern.actionRequired}] (Normalized: "${legacy.normalizedQuery}" vs "${modern.normalizedQuery}")`;
    }

    return { legacy, modern, match: isMatch, isMatch, delta };
  },
};
