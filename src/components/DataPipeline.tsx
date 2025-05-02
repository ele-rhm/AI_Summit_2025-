import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import finalDrawImage from '../final_draw.png';

// Dataset composition data
const sourceDistribution = [
  { name: 'Scientific Journals', value: 25, color: '#8884d8' },
  { name: 'Mainstream News', value: 30, color: '#82ca9d' },
  { name: 'Social Media', value: 35, color: '#ffc658' },
  { name: 'Alternative Health Blogs', value: 10, color: '#ff8042' }
];

const contentClassification = [
  { name: 'Factual Content', value: 60, color: '#4CAF50' },
  { name: 'Contains Misinformation', value: 40, color: '#f44336' }
];

const stanceDistribution = [
  { name: 'Pro-vaccine', value: 45, color: '#2196F3' },
  { name: 'Neutral', value: 30, color: '#9E9E9E' },
  { name: 'Vaccine-skeptical', value: 25, color: '#FF9800' }
];

const sourceImpact = [
  { name: 'Scientific Publications', impact: 85 },
  { name: 'Healthcare Professionals', impact: 80 },
  { name: 'Government Health Agencies', impact: 75 },
  { name: 'Mainstream News', impact: 65 },
  { name: 'Social Media', impact: 45 },
  { name: 'Alternative Health Blogs', impact: 35 }
];

const DataPipeline: React.FC = () => {
  return (
    <div className="space-y-8 p-4">
      {/* Data Collection Pipeline */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Data Collection Pipeline</h2>
        <div className="w-full flex justify-center">
          <img 
            src={finalDrawImage}
            alt="Data Collection Pipeline"
            className="w-full max-w-4xl rounded-lg shadow-lg"
            style={{ 
              backgroundColor: 'white',
              padding: '20px',
              maxHeight: '500px',
              objectFit: 'contain'
            }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Our data collection pipeline combines web scraping, fact-checking services, and advanced LLM models
          to gather, verify, and classify vaccine-related content from diverse sources.
        </div>
      </div>

      {/* Information Sources */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Information Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Source Distribution */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-center">Source Distribution</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={sourceDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={60}
                    paddingAngle={2}
                    labelLine={true}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      name
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.25;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const adjustedX = x > cx ? x + 5 : x - 5;
                      const adjustedY = y - 5;
                      
                      return (
                        <text
                          x={adjustedX}
                          y={adjustedY}
                          fill="#000"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize="11"
                        >
                          {`${name} (${value}%)`}
                        </text>
                      );
                    }}
                  >
                    {sourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Content Classification */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-center">Content Classification</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={contentClassification}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={60}
                    paddingAngle={2}
                    labelLine={true}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      name
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.25;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const adjustedX = x > cx ? x + 5 : x - 5;
                      const adjustedY = y - 5;
                      
                      return (
                        <text
                          x={adjustedX}
                          y={adjustedY}
                          fill="#000"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize="11"
                        >
                          {`${name} (${value}%)`}
                        </text>
                      );
                    }}
                  >
                    {contentClassification.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stance Distribution */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2 text-center">Content Stance</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={stanceDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={0}
                    outerRadius={60}
                    paddingAngle={2}
                    labelLine={true}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      name
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.25;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const adjustedX = x > cx ? x + 5 : x - 5;
                      const adjustedY = y - 5;
                      
                      return (
                        <text
                          x={adjustedX}
                          y={adjustedY}
                          fill="#000"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize="11"
                        >
                          {`${name} (${value}%)`}
                        </text>
                      );
                    }}
                  >
                    {stanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Methodology</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Verification Process</h3>
            <p className="text-gray-700">
              Our content verification process combines automated AI classification with human expert review.
              Each piece of content is analyzed for factual accuracy, source credibility, and potential biases.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Balanced Representation</h3>
            <p className="text-gray-700">
              We ensure balanced coverage by actively collecting content from diverse sources and viewpoints,
              while maintaining rigorous fact-checking standards across all content types.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Limitations & Biases</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Limited access to private social media conversations</li>
              <li>Potential language and regional biases in data collection</li>
              <li>Evolving nature of COVID-19 research and information</li>
              <li>Challenges in detecting subtle forms of misinformation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPipeline;