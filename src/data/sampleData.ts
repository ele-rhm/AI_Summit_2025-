import { SimulationData } from '../types/simulationTypes';

// Sample data for simulation
export const simulationData: SimulationData = {
  overallResults: [
    { name: "Yes", value: 45 },
    { name: "No", value: 35 },
    { name: "Maybe", value: 20 },
  ],
  factorImpact: [
    {
      name: "Source Credibility",
      factual: 75,
      misinformation: 30,
      conspiracy: 15,
    },
    {
      name: "Political Alignment",
      factual: 60,
      misinformation: 45,
      conspiracy: 25,
    },
    {
      name: "Prior Beliefs",
      factual: 80,
      misinformation: 65,
      conspiracy: 50,
    },
    {
      name: "Health Literacy",
      factual: 85,
      misinformation: 40,
      conspiracy: 20,
    },
  ],
  agentProfiles: [
    {
      id: "AGENT_001",
      name: "James Wilson",
      gender: "Male",
      age: 42,
      education: "Bachelor's degree",
      occupation: "Software Engineer",
      political: "Moderate",
      religion: "Christian",
      priorAttitude: "Generally pro-vaccine",
      responseToFactual: "Yes",
      responseToMisinfo: "Maybe",
    },
    {
      id: "AGENT_002",
      name: "Maria Rodriguez",
      gender: "Female",
      age: 35,
      education: "Master's degree",
      occupation: "Healthcare Administrator",
      political: "Liberal",
      religion: "Catholic",
      priorAttitude: "Very pro-vaccine",
      responseToFactual: "Yes",
      responseToMisinfo: "Yes",
    },
    {
      id: "AGENT_003",
      name: "Robert Kim",
      gender: "Male",
      age: 67,
      education: "High school diploma",
      occupation: "Retired Teacher",
      political: "Conservative",
      religion: "Buddhist",
      priorAttitude: "Somewhat hesitant",
      responseToFactual: "Maybe",
      responseToMisinfo: "No",
    },
  ],
  infoSourceImpact: [
    { name: "CBC News", yes: 70, maybe: 20, no: 10 },
    { name: "CTV News", yes: 65, maybe: 25, no: 10 },
    { name: "Global News", yes: 60, maybe: 25, no: 15 },
    { name: "Toronto Star", yes: 68, maybe: 22, no: 10 },
    { name: "National Post", yes: 45, maybe: 30, no: 25 },
    { name: "The Rebel", yes: 20, maybe: 30, no: 50 },
    { name: "Scientific Journal", yes: 85, maybe: 10, no: 5 },
    { name: "Social Media", yes: 25, maybe: 35, no: 40 },
    { name: "Alt Health Blog", yes: 15, maybe: 25, no: 60 },
  ],
  attitudeChanges: [
    { name: "More Positive", value: 15 },
    { name: "No Change", value: 65 },
    { name: "More Negative", value: 20 },
  ],
  // New simulation-specific data
  simulationHistory: [
    { step: 0, hesitancy: 0.65, policyApplied: false },
    { step: 1, hesitancy: 0.63, policyApplied: false },
    { step: 2, hesitancy: 0.64, policyApplied: false },
    { step: 3, hesitancy: 0.62, policyApplied: false },
    { step: 4, hesitancy: 0.60, policyApplied: false },
    { step: 5, hesitancy: 0.59, policyApplied: true },
    { step: 6, hesitancy: 0.55, policyApplied: true },
    { step: 7, hesitancy: 0.52, policyApplied: true },
    { step: 8, hesitancy: 0.50, policyApplied: true },
    { step: 9, hesitancy: 0.48, policyApplied: true },
    { step: 10, hesitancy: 0.45, policyApplied: true },
    { step: 11, hesitancy: 0.43, policyApplied: true },
    { step: 12, hesitancy: 0.41, policyApplied: true },
    { step: 13, hesitancy: 0.40, policyApplied: true },
    { step: 14, hesitancy: 0.39, policyApplied: true },
  ],
  policyComparisons: [
    {
      name: "Week 1",
      financial: 0.60,
      ambassador: 0.62,
      mandate: 0.59,
      none: 0.64
    },
    {
      name: "Week 3",
      financial: 0.55,
      ambassador: 0.58,
      mandate: 0.52,
      none: 0.63
    },
    {
      name: "Week 5",
      financial: 0.52,
      ambassador: 0.55,
      mandate: 0.48,
      none: 0.62
    },
    {
      name: "Week 7",
      financial: 0.48,
      ambassador: 0.52,
      mandate: 0.43,
      none: 0.61
    },
    {
      name: "Week 9",
      financial: 0.45,
      ambassador: 0.50,
      mandate: 0.39,
      none: 0.60
    },
  ],
  activePolicies: [
    { name: "Financial Incentive ($50)", applied: true, strength: "Strong" },
    { name: "Community Ambassador", applied: false, strength: "Weak" },
    { name: "Vaccine Mandate", applied: false, strength: "Strong" },
  ],
  sampleAgentSimulations: [
    {
      id: "AGENT_001",
      name: "James Wilson",
      demographicsLabel: "42, Bachelor's, Moderate",
      trajectory: [
        { week: 0, attitude: 2 },
        { week: 1, attitude: 2 },
        { week: 2, attitude: 2 },
        { week: 3, attitude: 3 },
        { week: 4, attitude: 3 },
        { week: 5, attitude: 3 },
        { week: 6, attitude: 4 },
        { week: 7, attitude: 4 },
      ],
      key_lessons: [
        "Learned vaccines have been scientifically tested",
        "Financial incentive makes vaccination more attractive",
        "Friends on social media are getting vaccinated"
      ]
    },
    {
      id: "AGENT_003",
      name: "Robert Kim",
      demographicsLabel: "67, High School, Conservative",
      trajectory: [
        { week: 0, attitude: 1 },
        { week: 1, attitude: 1 },
        { week: 2, attitude: 1 },
        { week: 3, attitude: 1 },
        { week: 4, attitude: 2 },
        { week: 5, attitude: 2 },
        { week: 6, attitude: 2 },
        { week: 7, attitude: 2 },
      ],
      key_lessons: [
        "Skeptical of government health policies",
        "Financial incentive seems suspicious",
        "Concerned about vaccine side effects"
      ]
    }
  ]
};