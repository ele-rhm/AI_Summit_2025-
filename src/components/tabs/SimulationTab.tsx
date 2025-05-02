import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Line, LineChart, Legend, ReferenceLine, BarChart, Bar
} from 'recharts';
import { SimulationData } from '../../types/simulationTypes';
import { SimulationControls } from '../SimulationControls';

interface SimulationTabProps {
  data: SimulationData;
  currentStepIndex: number;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  isSimulationRunning: boolean;
  selectedPolicy: string;
  setSelectedPolicy: (policy: string) => void;
  policyStrength: string;
  setPolicyStrength: (strength: string) => void;
  handleStartSimulation: () => void;
  handleStopSimulation: () => void;
  handleResetSimulation: () => void;
}

// Base data that will be used when simulation starts
const baseHesitancyData = [
  { week: 0, hesitancy: 65 },
  { week: 1, hesitancy: 63 },
  { week: 2, hesitancy: 64 },
  { week: 3, hesitancy: 62 },
  { week: 4, hesitancy: 60 },
  { week: 5, hesitancy: 59 },
  { week: 7, hesitancy: 52 },
  { week: 9, hesitancy: 48 },
  { week: 11, hesitancy: 43 },
  { week: 14, hesitancy: 39 }
];

const basePolicyData = [
  { week: 1, financial: 65, ambassador: 65, mandate: 65, none: 65 },  // Starting point
  { week: 2, financial: 62, ambassador: 63, mandate: 61, none: 64 },  // Early response
  { week: 3, financial: 58, ambassador: 60, mandate: 55, none: 64 },  // Initial impact
  { week: 4, financial: 54, ambassador: 56, mandate: 48, none: 63 },  // Growing effect
  { week: 5, financial: 50, ambassador: 52, mandate: 42, none: 63 },  // Mid-term results
  { week: 6, financial: 47, ambassador: 48, mandate: 38, none: 62 },  // Continued impact
  { week: 7, financial: 45, ambassador: 45, mandate: 35, none: 62 },  // Late stage
  { week: 8, financial: 44, ambassador: 43, mandate: 33, none: 61 },  // Near final
  { week: 9, financial: 43, ambassador: 42, mandate: 32, none: 61 }   // Final results
];

const agentTrajectories = [
  {
    id: 1,
    profile: "42-year-old, Bachelor's degree, Moderate politics",
    trajectory: "Probably Not → Definitely Yes",
    changes: [
      { week: 0, attitude: 2 },
      { week: 3, attitude: 2.5 },
      { week: 6, attitude: 3 },
      { week: 9, attitude: 4 }
    ],
    lessons: "Responded well to factual information and peer influence"
  },
  {
    id: 2,
    profile: "35-year-old, Master's degree, Liberal politics",
    trajectory: "Definitely Yes → Definitely Yes",
    changes: [
      { week: 0, attitude: 4 },
      { week: 3, attitude: 4 },
      { week: 6, attitude: 4 },
      { week: 9, attitude: 4 }
    ],
    lessons: "Strong initial position maintained throughout"
  },
  {
    id: 3,
    profile: "67-year-old, High School education, Conservative politics",
    trajectory: "Definitely Not → Probably Not",
    changes: [
      { week: 0, attitude: 1 },
      { week: 3, attitude: 1.5 },
      { week: 6, attitude: 2 },
      { week: 9, attitude: 2 }
    ],
    lessons: "Gradual shift influenced by community ambassador program"
  },
  {
    id: 4,
    profile: "29-year-old, PhD, Very Liberal politics",
    trajectory: "Probably Yes → Definitely Yes",
    changes: [
      { week: 0, attitude: 3 },
      { week: 3, attitude: 3.5 },
      { week: 6, attitude: 4 },
      { week: 9, attitude: 4 }
    ],
    lessons: "Quick adoption of scientific information"
  },
  {
    id: 5,
    profile: "55-year-old, Some College, Very Conservative politics",
    trajectory: "Definitely Not → Definitely Not",
    changes: [
      { week: 0, attitude: 1 },
      { week: 3, attitude: 1 },
      { week: 6, attitude: 1 },
      { week: 9, attitude: 1 }
    ],
    lessons: "Resistant to change despite multiple interventions"
  }
];

const SimulationTab: React.FC<SimulationTabProps> = ({
  data,
  currentStepIndex,
  simulationSpeed,
  setSimulationSpeed,
  isSimulationRunning,
  selectedPolicy,
  setSelectedPolicy,
  policyStrength,
  setPolicyStrength,
  handleStartSimulation,
  handleStopSimulation,
  handleResetSimulation
}) => {
  // Initialize empty data arrays
  const [hesitancyData, setHesitancyData] = useState<Array<any>>([]);
  const [policyData, setPolicyData] = useState<Array<any>>([]);
  const [sourceImpactData, setSourceImpactData] = useState<Array<any>>([]);

  // Update data when simulation starts or progresses
  useEffect(() => {
    if (isSimulationRunning || currentStepIndex > 0) {
      setPolicyData(basePolicyData.slice(0, Math.floor(currentStepIndex / 2) + 1));
      setHesitancyData(baseHesitancyData.slice(0, Math.floor(currentStepIndex / 2) + 1));
      setSourceImpactData(data.infoSourceImpact);
    } else {
      setPolicyData([]);
      setHesitancyData([]);
      setSourceImpactData([]);
    }
  }, [isSimulationRunning, currentStepIndex, data.infoSourceImpact]);

  // Get color for the selected policy
  const getPolicyColor = (policy: string) => {
    switch(policy) {
      case 'financial': return '#6366F1';  // Indigo
      case 'ambassador': return '#10B981'; // Emerald
      case 'mandate': return '#8B5CF6';    // Purple
      case 'none': return '#6B7280';       // Gray
      default: return '#6366F1';           // Indigo
    }
  };

  // Get the current data slice based on simulation progress and selected policy
  const getCurrentData = () => {
    if (!isSimulationRunning && currentStepIndex === 0) {
      return [];
    }
    return hesitancyData.map(point => ({
      week: point.week,
      hesitancy: point.hesitancy
    }));
  };

  // Get the current policy data based on simulation progress
  const getCurrentPolicyData = () => {
    if (!isSimulationRunning && currentStepIndex === 0) {
      return [];
    }
    return policyData;
  };

  return (
    <div className="space-y-8 p-4">
      {/* Simulation Controls - Now at the top */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Simulation Controls</h2>
            <p className="text-gray-600">
              This simulation visualizes population vaccine hesitancy levels over time as influenced by various policies 
              and social factors using LLM-based agents.
            </p>
          </div>
          <div className="flex-shrink-0">
            <SimulationControls
              simulationSpeed={simulationSpeed}
              setSimulationSpeed={setSimulationSpeed}
              isSimulationRunning={isSimulationRunning}
              selectedPolicy={selectedPolicy}
              setSelectedPolicy={setSelectedPolicy}
              policyStrength={policyStrength}
              setPolicyStrength={setPolicyStrength}
              handleStartSimulation={handleStartSimulation}
              handleStopSimulation={handleStopSimulation}
              handleResetSimulation={handleResetSimulation}
            />
          </div>
        </div>
      </div>

      {/* Population Hesitancy Over Time */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Population Hesitancy Over Time - {selectedPolicy.charAt(0).toUpperCase() + selectedPolicy.slice(1)} Policy</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorHesitancy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getPolicyColor(selectedPolicy)} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={getPolicyColor(selectedPolicy)} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week" 
                label={{ value: 'Week', position: 'insideBottomRight', offset: -5 }}
                domain={[0, 9]}  // Set fixed domain for X axis
              />
              <YAxis 
                label={{ value: 'Hesitancy Rate (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}  // Set fixed domain for Y axis
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="hesitancy" 
                stroke={getPolicyColor(selectedPolicy)} 
                fillOpacity={1} 
                fill="url(#colorHesitancy)" 
              />
              <ReferenceLine x={5} stroke="red" strokeDasharray="3 3" label={{ value: 'Policy Applied', position: 'top', fill: 'red' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Current Week: {currentStepIndex} | 
          Current Hesitancy: {
            getCurrentData().length > 0 
              ? `${getCurrentData()[getCurrentData().length - 1].hesitancy}%` 
              : '0%'
          }
        </div>
      </div>

      {/* Policy Effectiveness Comparison */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Policy Effectiveness Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getCurrentPolicyData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="week" 
                label={{ value: 'Week', position: 'insideBottomRight', offset: -5 }}
                domain={[0, 9]}
                tick={{ fill: '#1F2937' }}
              />
              <YAxis 
                label={{ value: 'Hesitancy Rate (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
                tick={{ fill: '#1F2937' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="financial" 
                stroke="#6366F1" 
                name="Financial Incentive"
                strokeWidth={2}
                dot={{ r: 4, fill: "#6366F1" }}
                activeDot={{ r: 6, fill: "#6366F1" }}
              />
              <Line 
                type="monotone" 
                dataKey="ambassador" 
                stroke="#10B981" 
                name="Ambassador Program"
                strokeWidth={2}
                dot={{ r: 4, fill: "#10B981" }}
                activeDot={{ r: 6, fill: "#10B981" }}
              />
              <Line 
                type="monotone" 
                dataKey="mandate" 
                stroke="#8B5CF6" 
                name="Vaccine Mandate"
                strokeWidth={2}
                dot={{ r: 4, fill: "#8B5CF6" }}
                activeDot={{ r: 6, fill: "#8B5CF6" }}
              />
              <Line 
                type="monotone" 
                dataKey="none" 
                stroke="#6B7280" 
                name="No Policy"
                strokeWidth={2}
                dot={{ r: 4, fill: "#6B7280" }}
                activeDot={{ r: 6, fill: "#6B7280" }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source Impact Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Source Impact Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sourceImpactData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#1F2937' }}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fill: '#1F2937' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar
                dataKey="yes"
                name="Would Take Vaccine"
                stackId="a"
                fill="#4CAF50"
              />
              <Bar
                dataKey="maybe"
                name="Might Take Vaccine"
                stackId="a"
                fill="#FFC107"
              />
              <Bar
                dataKey="no"
                name="Would Not Take Vaccine"
                stackId="a"
                fill="#F44336"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sample Agent Trajectories */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sample Agent Trajectories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agentTrajectories.map(agent => (
            <div key={agent.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{agent.profile}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">Initial:</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {agent.trajectory.split('→')[0].trim()}
                    </span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {agent.trajectory.split('→')[1].trim()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="h-48 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={agent.changes.slice(0, Math.floor(currentStepIndex / 2) + 1)} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `Week ${value}`}
                    />
                    <YAxis 
                      domain={[1, 4]} 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        switch(value) {
                          case 1: return 'Definitely Not';
                          case 2: return 'Probably Not';
                          case 3: return 'Probably Yes';
                          case 4: return 'Definitely Yes';
                          default: return '';
                        }
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => {
                        switch(value) {
                          case 1: return 'Definitely Not';
                          case 2: return 'Probably Not';
                          case 3: return 'Probably Yes';
                          case 4: return 'Definitely Yes';
                          default: return value;
                        }
                      }}
                      labelFormatter={(value) => `Week ${value}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attitude" 
                      stroke="#6366F1" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#6366F1" }}
                      activeDot={{ r: 6, fill: "#6366F1" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Key Lesson:</span> {agent.lessons}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How The Simulation Works */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">How The Simulation Works</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">VACSIM Framework</h3>
            <p className="text-gray-600">
              Our simulation uses LLM-based agents to model complex human behavior and decision-making processes
              in the context of vaccine hesitancy. Each agent is equipped with realistic cognitive capabilities
              and social interaction patterns.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Information Processing</h3>
            <p className="text-gray-600">
              Agents process information through a sophisticated memory system that considers source credibility,
              personal biases, and prior beliefs. This creates realistic patterns of information adoption and
              attitude formation.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Social Network Influence</h3>
            <p className="text-gray-600">
              The simulation models social networks where agents influence each other's decisions through
              peer pressure, social proof, and information sharing. This creates realistic cascading effects
              in the population.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Policy Interventions</h3>
            <p className="text-gray-600">
              Different policy interventions (financial incentives, ambassador programs, mandates) are modeled
              with varying effectiveness based on agent characteristics and social context. This allows for
              realistic assessment of policy impacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationTab;