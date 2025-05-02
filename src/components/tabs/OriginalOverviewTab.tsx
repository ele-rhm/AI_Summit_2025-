import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ReferenceLine
} from 'recharts';
import { SimulationData } from '../../types/simulationTypes';
import { COLORS, decisionColors, policyColors } from '../../utils/chartColors';

interface OriginalOverviewTabProps {
  data: SimulationData;
}

const OriginalOverviewTab: React.FC<OriginalOverviewTabProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Overall Vaccine Acceptance
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.overallResults}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.overallResults.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      decisionColors[entry.name as keyof typeof decisionColors] ||
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Attitude Changes After Exposure
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.attitudeChanges}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.attitudeChanges.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">
          Information Source Impact on Decisions
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.infoSourceImpact}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="yes"
                name="Would Take Vaccine"
                stackId="a"
                fill={decisionColors["Yes"]}
              />
              <Bar
                dataKey="maybe"
                name="Might Take Vaccine"
                stackId="a"
                fill={decisionColors["Maybe"]}
              />
              <Bar
                dataKey="no"
                name="Would Not Take Vaccine"
                stackId="a"
                fill={decisionColors["No"]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Policy Comparison Chart */}
      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">
          Policy Effectiveness Comparison
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.policyComparisons}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0.3, 0.7]} 
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} 
                label={{ value: 'Hesitancy Rate', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Hesitancy Rate']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="financial" 
                name="Financial Incentive" 
                stroke={policyColors.financial} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="ambassador" 
                name="Community Ambassador" 
                stroke={policyColors.ambassador} 
              />
              <Line 
                type="monotone" 
                dataKey="mandate" 
                name="Vaccine Mandate" 
                stroke={policyColors.mandate} 
              />
              <Line 
                type="monotone" 
                dataKey="none" 
                name="No Policy" 
                stroke={policyColors.none}
                strokeDasharray="5 5" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Sample Agent Trajectories */}
      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">
          Sample Agent Trajectories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.sampleAgentSimulations.map((agent) => (
            <div key={agent.id} className="p-3 border rounded-md">
              <div className="font-medium">{agent.name}</div>
              <div className="text-sm text-gray-500 mb-2">{agent.demographicsLabel}</div>
              
              <div className="h-48 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={agent.trajectory}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="week" 
                      label={{ value: 'Week', position: 'insideBottom', offset: -5, fontSize: 10 }} 
                    />
                    <YAxis 
                      domain={[0.5, 4.5]} 
                      ticks={[1, 2, 3, 4]} 
                      label={{ value: 'Attitude', angle: -90, position: 'insideLeft', fontSize: 10 }} 
                    />
                    <Tooltip
                      formatter={(value) => [
                        value === 1 ? "Definitely Not" : 
                        value === 2 ? "Probably Not" : 
                        value === 3 ? "Probably Yes" : 
                        "Definitely Yes", 
                        "Vaccination Attitude"
                      ]}
                      labelFormatter={(value) => `Week ${value}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attitude" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    {/* Policy application line */}
                    <Line
                      key="policy-line"
                      type="monotone"
                      dataKey="week"
                      stroke="transparent"
                      dot={false}
                      activeDot={false}
                      legendType="none"
                      isAnimationActive={false}
                      connectNulls
                    />
                    <ReferenceLine
                      x={5}
                      stroke="red"
                      strokeDasharray="3 3"
                      label={{ value: "Policy Applied", position: "top", fill: "red", fontSize: 10 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-xs">
                <div className="font-medium mb-1">Key Lessons:</div>
                <ul className="list-disc pl-4 space-y-1">
                  {agent.key_lessons.map((lesson, idx) => (
                    <li key={idx}>{lesson}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OriginalOverviewTab; 