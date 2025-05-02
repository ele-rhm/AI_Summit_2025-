import React from 'react';

interface SimulationControlsProps {
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

export const SimulationControls: React.FC<SimulationControlsProps> = ({
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
  return (
    <div className="bg-white p-4 rounded-lg shadow md:col-span-3">
      <h2 className="text-lg font-semibold mb-4">
        Simulation Controls
      </h2>
      <div className="bg-blue-50 p-2 rounded-md text-sm mb-4">
        <p>This simulation visualizes population vaccine hesitancy levels over time as influenced by various policies and social factors using LLM-based agents.</p>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Policy Type
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={selectedPolicy}
            onChange={(e) => setSelectedPolicy(e.target.value)}
            disabled={isSimulationRunning}
          >
            <option value="financial">Financial Incentive</option>
            <option value="ambassador">Community Ambassador</option>
            <option value="mandate">Vaccine Mandate</option>
            <option value="none">No Policy</option>
          </select>
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Policy Strength
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={policyStrength}
            onChange={(e) => setPolicyStrength(e.target.value)}
            disabled={isSimulationRunning || selectedPolicy === "none"}
          >
            <option value="weak">Weak</option>
            <option value="strong">Strong</option>
          </select>
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Simulation Speed
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(parseInt(e.target.value))}
          >
            <option value="500">Fast</option>
            <option value="1000">Medium</option>
            <option value="2000">Slow</option>
          </select>
        </div>
        <div className="flex-grow flex items-end space-x-2">
          <button
            className={`flex-1 p-2 rounded-md ${
              isSimulationRunning
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleStartSimulation}
            disabled={isSimulationRunning}
          >
            Start
          </button>
          <button
            className={`flex-1 p-2 rounded-md ${
              !isSimulationRunning
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
            onClick={handleStopSimulation}
            disabled={!isSimulationRunning}
          >
            Pause
          </button>
          <button
            className="flex-1 p-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
            onClick={handleResetSimulation}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};