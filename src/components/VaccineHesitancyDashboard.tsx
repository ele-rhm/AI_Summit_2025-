import React, { useState, useEffect } from 'react';
import OverviewTab from './tabs/OverviewTab';
import AgentsTab from './tabs/AgentsTab';
import SourcesTab from './tabs/SourcesTab';
import FactorsTab from './tabs/FactorsTab';
import SimulationTab from './tabs/SimulationTab';
import { simulationData as initialData } from '../data/sampleData';

const VaccineHesitancyDashboard: React.FC = () => {
  const [simulationData, setSimulationData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("vaxvision");
  const [simulationSpeed, setSimulationSpeed] = useState(1000);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedPolicy, setSelectedPolicy] = useState("financial");
  const [policyStrength, setPolicyStrength] = useState("strong");

  // Simulation animation logic
  useEffect(() => {
    let simulationInterval: NodeJS.Timeout | undefined;
    
    if (isSimulationRunning) {
      simulationInterval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= simulationData.simulationHistory.length - 1) {
            setIsSimulationRunning(false);
            return simulationData.simulationHistory.length - 1;
          }
          return prevIndex + 1;
        });
      }, simulationSpeed);
    }
    
    return () => {
      if (simulationInterval) clearInterval(simulationInterval);
    };
  }, [isSimulationRunning, simulationSpeed, simulationData.simulationHistory.length]);

  const handleStartSimulation = () => {
    setCurrentStepIndex(0);
    setIsSimulationRunning(true);
  };

  const handleStopSimulation = () => {
    setIsSimulationRunning(false);
  };

  const handleResetSimulation = () => {
    setIsSimulationRunning(false);
    setCurrentStepIndex(0);
  };

  const simulationControlProps = {
    simulationSpeed,
    setSimulationSpeed,
    isSimulationRunning,
    currentStepIndex,
    selectedPolicy,
    setSelectedPolicy,
    policyStrength,
    setPolicyStrength,
    handleStartSimulation,
    handleStopSimulation,
    handleResetSimulation
  };

  return (
    <div className="flex flex-col h-[90vh] bg-gray-50 rounded-lg shadow-lg my-4">
      <header className="bg-blue-700 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold">
          Vaccine Hesitancy Simulation Dashboard
        </h1>
        <p className="text-sm mt-2">AI Summit 2025 Case Competition</p>
      </header>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="flex p-4 space-x-2 overflow-x-auto">
          {[
            { id: "vaxvision", label: "VaxVision" },
            { id: "agents", label: "Agent Profiles" },
            { id: "sources", label: "Information Sources" },
            { id: "factors", label: "Influencing Factors" },
            { id: "simulation", label: "Simulation" }
          ].map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-3 rounded-md whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {activeTab === "vaxvision" && <OverviewTab data={simulationData} />}
          {activeTab === "agents" && <AgentsTab data={simulationData} />}
          {activeTab === "sources" && <SourcesTab data={simulationData} />}
          {activeTab === "factors" && <FactorsTab data={simulationData} />}
          {activeTab === "simulation" && (
            <SimulationTab 
              data={simulationData} 
              currentStepIndex={currentStepIndex}
              {...simulationControlProps}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default VaccineHesitancyDashboard;