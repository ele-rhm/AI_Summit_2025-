// Type definitions for simulation data

export interface OverallResult {
  name: string;
  value: number;
}

export interface FactorImpact {
  name: string;
  factual: number;
  misinformation: number;
  conspiracy: number;
}

export interface AgentProfile {
  id: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  occupation: string;
  political: string;
  religion: string;
  priorAttitude: string;
  responseToFactual: string;
  responseToMisinfo: string;
}

export interface InfoSourceImpact {
  name: string;
  yes: number;
  maybe: number;
  no: number;
}

export interface AttitudeChange {
  name: string;
  value: number;
}

export interface SimulationHistoryPoint {
  step: number;
  hesitancy: number;
  policyApplied: boolean;
}

export interface PolicyComparison {
  name: string;
  financial: number;
  ambassador: number;
  mandate: number;
  none: number;
}

export interface ActivePolicy {
  name: string;
  applied: boolean;
  strength: string;
}

export interface AgentTrajectoryPoint {
  week: number;
  attitude: number;
}

export interface SampleAgentSimulation {
  id: string;
  name: string;
  demographicsLabel: string;
  trajectory: AgentTrajectoryPoint[];
  key_lessons: string[];
}

export interface SimulationData {
  overallResults: OverallResult[];
  factorImpact: FactorImpact[];
  agentProfiles: AgentProfile[];
  infoSourceImpact: InfoSourceImpact[];
  attitudeChanges: AttitudeChange[];
  simulationHistory: SimulationHistoryPoint[];
  policyComparisons: PolicyComparison[];
  activePolicies: ActivePolicy[];
  sampleAgentSimulations: SampleAgentSimulation[];
}