import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ContributingFactorsTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cognitive');

  // Data for cognitive biases
  const cognitiveData = [
    { name: 'Naturalness bias', value: 45, description: 'Preference for "natural" over "artificial" interventions' },
    { name: 'Confirmation bias', value: 40, description: 'Seeking information that confirms existing beliefs' },
    { name: 'Omission bias', value: 35, description: 'Preference for inaction over action' },
    { name: 'Ambiguity aversion', value: 35, description: 'Avoiding uncertain or unknown options' },
    { name: 'Availability heuristic', value: 30, description: 'Judging probability by easily recalled examples' },
    { name: 'Optimism bias', value: 25, description: 'Underestimating personal risk' },
  ].sort((a, b) => b.value - a.value);

  // Data for source credibility
  const sourceData = [
    { name: 'Scientific journals', value: 80, description: 'Peer-reviewed research articles and studies' },
    { name: 'Mainstream news', value: 65, description: 'Traditional news media outlets' },
    { name: 'Social media', value: 20, description: 'Information from social media platforms' },
    { name: 'Alternative blogs', value: 15, description: 'Alternative health and wellness blogs' },
  ].sort((a, b) => b.value - a.value);

  // Data for demographic factors
  const educationData = [
    { level: 'Graduate degree', acceptance: 85 },
    { level: 'Bachelor\'s degree', acceptance: 75 },
    { level: 'Some college', acceptance: 60 },
    { level: 'High school or less', acceptance: 45 },
  ];

  const ageData = [
    { group: '18-24', acceptance: 55, socialInfluence: 70 },
    { group: '25-44', acceptance: 60, socialInfluence: 50 },
    { group: '45-64', acceptance: 65, socialInfluence: 30 },
    { group: '65+', acceptance: 75, socialInfluence: 15 },
  ];

  const politicalData = [
    { orientation: 'Very liberal', acceptance: 85 },
    { orientation: 'Somewhat liberal', acceptance: 75 },
    { orientation: 'Moderate', acceptance: 65 },
    { orientation: 'Somewhat conservative', acceptance: 50 },
    { orientation: 'Very conservative', acceptance: 35 },
  ];

  // Data for psychological factors
  const trustData = [
    { category: 'High trust in science', value: 85 },
    { category: 'Medium trust in science', value: 60 },
    { category: 'Low trust in science', value: 25 },
    { category: 'High trust in government', value: 80 },
    { category: 'Medium trust in government', value: 55 },
    { category: 'Low trust in government', value: 30 },
  ];

  const thinkingData = [
    { style: 'Highly analytical', acceptance: 80, misinfo: 25 },
    { style: 'Moderately analytical', acceptance: 65, misinfo: 40 },
    { style: 'Balanced', acceptance: 55, misinfo: 50 },
    { style: 'Moderately intuitive', acceptance: 45, misinfo: 65 },
    { style: 'Highly intuitive', acceptance: 35, misinfo: 75 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600">{`${payload[0].value}%`}</p>
          {payload[0].payload.description && (
            <p className="text-sm text-gray-600 mt-2">{payload[0].payload.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 p-6">
      {/* Section Navigation */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeSection === 'cognitive'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveSection('cognitive')}
        >
          Cognitive Biases
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeSection === 'source'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveSection('source')}
        >
          Source Credibility
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeSection === 'demographic'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveSection('demographic')}
        >
          Demographics
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeSection === 'psychological'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveSection('psychological')}
        >
          Psychological Factors
        </button>
      </div>

      {/* Cognitive Biases Section */}
      {activeSection === 'cognitive' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Impact of Cognitive Biases on Vaccine Hesitancy</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cognitiveData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="%" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Source Credibility Section */}
      {activeSection === 'source' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Source Credibility and Vaccine Acceptance</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="%" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Demographic Factors Section */}
      {activeSection === 'demographic' && (
        <div className="space-y-6">
          {/* Education Impact */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Education Level Impact</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={educationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Bar dataKey="acceptance" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age Group Impact */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Age Group Impact</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="acceptance" name="Vaccine Acceptance" fill="#EC4899" />
                  <Bar dataKey="socialInfluence" name="Social Media Influence" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Political Orientation Impact */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Political Orientation Impact</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={politicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="orientation" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Bar dataKey="acceptance" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Psychological Factors Section */}
      {activeSection === 'psychological' && (
        <div className="space-y-6">
          {/* Trust Factors */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Trust Factors Impact</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trustData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit="%" />
                  <YAxis dataKey="category" type="category" width={200} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#14B8A6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Thinking Style Impact */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Thinking Style Impact</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={thinkingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="style" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="acceptance" name="Vaccine Acceptance" fill="#7C3AED" />
                  <Bar dataKey="misinfo" name="Misinformation Susceptibility" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributingFactorsTab; 