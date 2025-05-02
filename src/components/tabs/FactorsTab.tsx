import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { SimulationData } from '../../types/simulationTypes';

interface FactorsTabProps {
  data: SimulationData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const cognitiveBiasesData = [
  { name: 'Omission Bias', impact: 35 },
  { name: 'Availability Heuristic', impact: 30 },
  { name: 'Confirmation Bias', impact: 40 },
  { name: 'Optimism Bias', impact: 25 },
  { name: 'Naturalness Bias', impact: 45 },
  { name: 'Ambiguity Aversion', impact: 35 }
];

const sourceCredibilityData = [
  { name: 'Scientific Journals', acceptance: 80 },
  { name: 'Mainstream News', acceptance: 65 },
  { name: 'Social Media', acceptance: 20 },
  { name: 'Alternative Health Blogs', acceptance: 15 }
];

const educationData = [
  { name: 'Graduate Degree', acceptance: 85 },
  { name: "Bachelor's Degree", acceptance: 75 },
  { name: 'Some College', acceptance: 60 },
  { name: 'High School or Less', acceptance: 45 }
];

const ageGroupData = [
  { name: '18-24', acceptance: 55, socialMediaInfluence: 70 },
  { name: '25-44', acceptance: 60, socialMediaInfluence: 50 },
  { name: '45-64', acceptance: 65, socialMediaInfluence: 30 },
  { name: '65+', acceptance: 75, socialMediaInfluence: 15 }
];

const politicalData = [
  { name: 'Very Liberal', acceptance: 85 },
  { name: 'Somewhat Liberal', acceptance: 75 },
  { name: 'Moderate', acceptance: 65 },
  { name: 'Somewhat Conservative', acceptance: 50 },
  { name: 'Very Conservative', acceptance: 35 }
];

const trustData = [
  { name: 'High Trust in Science', acceptance: 85 },
  { name: 'Medium Trust in Science', acceptance: 60 },
  { name: 'Low Trust in Science', acceptance: 25 },
  { name: 'High Trust in Government', acceptance: 80 },
  { name: 'Medium Trust in Government', acceptance: 55 },
  { name: 'Low Trust in Government', acceptance: 30 }
];

const thinkingStyleData = [
  { name: 'Highly Analytical', acceptance: 80, misinformation: 25 },
  { name: 'Moderately Analytical', acceptance: 65, misinformation: 40 },
  { name: 'Balanced', acceptance: 55, misinformation: 50 },
  { name: 'Moderately Intuitive', acceptance: 45, misinformation: 65 },
  { name: 'Highly Intuitive', acceptance: 35, misinformation: 75 }
];

const FactorsTab: React.FC<FactorsTabProps> = ({ data }) => {
  return (
    <div className="space-y-8 p-4">
      {/* Cognitive Biases Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Cognitive Biases Impact</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cognitiveBiasesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis label={{ value: 'Hesitancy Impact (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="impact" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source Credibility Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Source Credibility Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceCredibilityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Acceptance Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="acceptance" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographic Factors Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Education Level Impact</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={educationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis label={{ value: 'Acceptance Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="acceptance" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Age Group Impact</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ageGroupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="acceptance" stroke="#8884d8" name="Acceptance Rate" />
                <Line type="monotone" dataKey="socialMediaInfluence" stroke="#82ca9d" name="Social Media Influence" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Political Orientation Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Political Orientation Impact</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={politicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis label={{ value: 'Acceptance Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="acceptance" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Psychological Factors Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Trust Factors Impact</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trustData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  tick={{ fontSize: 10, textDecoration: 'none' }}
                />
                <YAxis label={{ value: 'Acceptance Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="acceptance" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Thinking Style Impact</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={thinkingStyleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="acceptance" stroke="#8884d8" name="Acceptance Rate" />
                <Line type="monotone" dataKey="misinformation" stroke="#82ca9d" name="Misinformation Susceptibility" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactorsTab;