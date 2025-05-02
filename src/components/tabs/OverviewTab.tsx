import React from 'react';
import { 
  FaUsers, FaBrain, FaNetworkWired, FaClipboardCheck, 
  FaBuilding, FaChartPie, FaLightbulb, FaGlobe,
  FaChartLine, FaPhone, FaEnvelope, FaGlobeAmericas
} from 'react-icons/fa';
import { RiVirusFill } from 'react-icons/ri';

interface OverviewTabProps {
  data: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  return (
    <div className="space-y-12 p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <RiVirusFill className="text-5xl text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">VaxVision</h1>
        </div>
        <p className="text-xl text-gray-600">Vaccine Attitude and Communication Simulation</p>
        <p className="text-sm text-gray-500">AI Summit 2025 Case Competition</p>
        <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Executive Summary</h2>
        <p className="text-gray-600 leading-relaxed">
          VaxVision is an agent-based modeling platform that simulates vaccine attitudes and communication patterns across diverse populations. 
          Our solution helps public health organizations predict intervention outcomes and develop effective vaccination campaigns through AI-powered analysis.
        </p>
      </div>

      {/* The Challenge */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">The Challenge</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUsers className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Complex Demographics</h3>
              <p className="text-gray-600">Diverse populations with varying attitudes and beliefs about vaccination</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaNetworkWired className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Information Spread</h3>
              <p className="text-gray-600">Rapid circulation of both accurate information and misinformation</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaClipboardCheck className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Policy Effectiveness</h3>
              <p className="text-gray-600">Difficulty in predicting intervention outcomes</p>
            </div>
          </div>
        </div>
      </div>

      {/* VaxVision Model */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">VaxVision Model</h2>
        <div className="mb-8">
          <p className="text-gray-600 text-lg leading-relaxed">
            Our agent-based simulation leverages LLM-powered agents to model how diverse populations respond to vaccination information and policies.
          </p>
        </div>
        
        <h3 className="text-xl font-semibold mb-6 text-gray-700">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUsers className="text-xl text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800">Population Segments</h3>
            </div>
            <p className="text-gray-600">Realistic representation of population segments with unique attributes, reflecting diverse demographic characteristics and belief systems</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBrain className="text-xl text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800">Adaptive Memory Systems</h3>
            </div>
            <p className="text-gray-600">Agents form lessons from experiences that influence future decisions, creating dynamic and evolving behavior patterns</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaNetworkWired className="text-xl text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-800">Social Network Dynamics</h3>
            </div>
            <p className="text-gray-600">Information flows through realistic social connections between agents, simulating natural community interactions and influence patterns</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaChartLine className="text-xl text-green-600" />
              </div>
              <h3 className="font-medium text-gray-800">Natural Language Communication</h3>
            </div>
            <p className="text-gray-600">Agents process news, share opinions, and make decisions using natural language, enabling realistic information exchange</p>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Market Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBuilding className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Public Health Departments</h3>
              <p className="text-gray-600">Federal, state, and local health agencies</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUsers className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Healthcare Systems</h3>
              <p className="text-gray-600">Hospitals and healthcare networks</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaGlobe className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">International Organizations</h3>
              <p className="text-gray-600">Global health organizations</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FaChartPie className="text-2xl text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Pharmaceutical Companies</h3>
              <p className="text-gray-600">Vaccine manufacturers and distributors</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <FaLightbulb className="text-2xl text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Research Institutions</h3>
              <p className="text-gray-600">Academic and research organizations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Assessment */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Impact Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaChartPie className="text-xl text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Cost Savings</h3>
                <p className="text-gray-600">Significant reduction in campaign development costs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartLine className="text-xl text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Improved Vaccination Rates</h3>
                <p className="text-gray-600">Optimized messaging leading to higher acceptance</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUsers className="text-xl text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Better Understanding</h3>
                <p className="text-gray-600">Improved comprehension of hesitancy across demographics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaClipboardCheck className="text-xl text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Effective Policy Development</h3>
                <p className="text-gray-600">Ethical testing of communication strategies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;