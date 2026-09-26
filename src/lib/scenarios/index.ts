import { ScenarioDefinition, ScenarioId } from './types';
import { bankingScenario } from './banking';
import { healthcareScenario } from './healthcare';
import { sanctionsScenario } from './sanctions';

export const SCENARIOS: Record<ScenarioId, ScenarioDefinition> = {
  banking: bankingScenario,
  healthcare: healthcareScenario,
  sanctions: sanctionsScenario,
};

export const SCENARIO_LIST: ScenarioDefinition[] = [
  bankingScenario,
  healthcareScenario,
  sanctionsScenario,
];

export function getScenario(id: ScenarioId): ScenarioDefinition {
  return SCENARIOS[id] || bankingScenario;
}
