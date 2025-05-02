import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SimulationData } from '../../types/simulationTypes';
import * as d3 from 'd3';
import { FaTwitter } from 'react-icons/fa';

interface AgentsTabProps {
  data: SimulationData;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  color: string;
  demographics: {
    gender: string;
    age: number;
    education: string;
    occupation: string;
    religion: string;
    political: string;
    attitude: string;
  };
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}

const AgentsTab: React.FC<AgentsTabProps> = ({ data }) => {
  const [selectedAgent, setSelectedAgent] = useState<Node | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const selectedAgents = data.agentProfiles;

  // Add Key Agent Profiles section
  const renderAgentCard = (agent: any) => {
    const getPoliticalColor = (political: string) => {
      if (political.includes('Liberal') || political.includes('liberal')) return 'bg-blue-100 text-blue-800';
      if (political.includes('Conservative') || political.includes('conservative')) return 'bg-red-100 text-red-800';
      return 'bg-green-100 text-green-800';
    };

    const getVaccineAttitudeColor = (attitude: string) => {
      if (attitude.includes('pro-vaccine')) return 'bg-green-100 text-green-800';
      if (attitude.includes('hesitant')) return 'bg-yellow-100 text-yellow-800';
      if (attitude.includes('Anti-vaccine')) return 'bg-red-100 text-red-800';
      return 'bg-gray-100 text-gray-800';
    };

    return (
      <div key={agent.id} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{agent.name}</h3>
            <p className="text-sm text-gray-500">ID: {agent.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${getPoliticalColor(agent.political)}`}>
            {agent.political}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-600">Gender:</span>
            <span>{agent.gender}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-600">Age:</span>
            <span>{agent.age}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-600">Education:</span>
            <span>{agent.education}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-600">Occupation:</span>
            <span>{agent.occupation}</span>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-600">Religion:</span>
            <span>{agent.religion}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Vaccine Attitude:</span>
          <span className={`px-3 py-1 rounded-full text-sm ${getVaccineAttitudeColor(agent.priorAttitude)}`}>
            {agent.priorAttitude}
          </span>
        </div>
      </div>
    );
  };

  // Generate additional nodes for a richer network
  const generateNodes = () => {
    const baseNodes = selectedAgents.map(agent => ({
      id: agent.id,
      name: agent.name,
      color: agent.political.includes('Liberal') ? '#4299e1' : 
             agent.political.includes('Conservative') ? '#ed8936' : '#48bb78',
      demographics: {
        gender: agent.gender,
        age: agent.age,
        education: agent.education,
        occupation: agent.occupation,
        religion: agent.religion,
        political: agent.political,
        attitude: agent.priorAttitude
      }
    }));

    // Generate additional nodes
    const additionalNodes = Array.from({ length: 20 }, (_, i) => ({
      id: `generated-${i}`,
      name: `Agent ${i + selectedAgents.length + 1}`,
      color: ['#4299e1', '#ed8936', '#48bb78'][Math.floor(Math.random() * 3)],
      demographics: {
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(Math.random() * 40) + 20,
        education: ['High School', 'Bachelor', 'Master', 'PhD'][Math.floor(Math.random() * 4)],
        occupation: ['Engineer', 'Teacher', 'Doctor', 'Artist'][Math.floor(Math.random() * 4)],
        religion: ['Christian', 'Muslim', 'Hindu', 'None'][Math.floor(Math.random() * 4)],
        political: ['Liberal', 'Conservative', 'Moderate'][Math.floor(Math.random() * 3)],
        attitude: ['pro-vaccine', 'vaccine-hesitant', 'anti-vaccine'][Math.floor(Math.random() * 3)]
      }
    }));

    return [...baseNodes, ...additionalNodes];
  };

  const nodes: Node[] = generateNodes();

  // Create more realistic network connections
  const generateLinks = () => {
    const links: Link[] = [];
    const totalNodes = nodes.length;

    // Ensure each node has at least 2-3 connections
    nodes.forEach((node, i) => {
      // Add 2-3 random connections for each node
      const numConnections = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numConnections; j++) {
        let targetIndex;
        do {
          targetIndex = Math.floor(Math.random() * totalNodes);
        } while (targetIndex === i || links.some(link => 
          (link.source === node.id && link.target === nodes[targetIndex].id) ||
          (link.source === nodes[targetIndex].id && link.target === node.id)
        ));

        links.push({
          source: node.id,
          target: nodes[targetIndex].id,
          value: 0.5 + Math.random() * 0.5
        });
      }
    });

    // Add some additional random connections for more network-like appearance
    for (let i = 0; i < totalNodes * 0.3; i++) {
      const sourceIndex = Math.floor(Math.random() * totalNodes);
      let targetIndex;
      do {
        targetIndex = Math.floor(Math.random() * totalNodes);
      } while (targetIndex === sourceIndex || links.some(link =>
        (link.source === nodes[sourceIndex].id && link.target === nodes[targetIndex].id) ||
        (link.source === nodes[targetIndex].id && link.target === nodes[sourceIndex].id)
      ));

      links.push({
        source: nodes[sourceIndex].id,
        target: nodes[targetIndex].id,
        value: 0.3 + Math.random() * 0.3
      });
    }

    return links;
  };

  const links: Link[] = generateLinks();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 1000;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    // Create the simulation with enhanced forces
    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links)
        .id(d => d.id)
        .distance(120)
        .strength(d => (d as Link).value * 0.7))
      .force("charge", d3.forceManyBody()
        .strength(-400)
        .distanceMax(300))
      .force("center", d3.forceCenter())
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .force("collision", d3.forceCollide().radius(20))
      .alphaDecay(0.008)
      .velocityDecay(0.3);

    // Create the links with enhanced styling
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-width", d => d.value * 1.5)
      .attr("stroke-opacity", 0.6);

    // Add Twitter bird group
    const birdGroup = svg.append("g")
      .attr("class", "bird-group");

    // Add a large white background circle to make bird more visible
    birdGroup.append("circle")
      .attr("r", 12)  // Adjusted background circle
      .attr("fill", "white")
      .attr("opacity", 0.9)
      .attr("transform", "translate(0, 0)");

    // Add the bird path
    birdGroup.append("path")
      .attr("class", "twitter-bird")
      .attr("d", "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z")
      .attr("fill", "#1DA1F2")
      .style("opacity", 1);

    // Function to move bird between nodes
    function moveBird() {
      // Get random source and target nodes
      const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
      const targetNode = nodes[Math.floor(Math.random() * nodes.length)];

      if (sourceNode === targetNode || !sourceNode?.x || !sourceNode?.y || !targetNode?.x || !targetNode?.y) {
        setTimeout(moveBird, 100);
        return;
      }

      // Move the bird
      birdGroup
        .attr("transform", `translate(${sourceNode.x},${sourceNode.y}) scale(0.8)`) // Moderately sized bird
        .transition()
        .duration(5000) // 5 seconds movement
        .ease(d3.easeLinear)
        .attr("transform", `translate(${targetNode.x},${targetNode.y}) scale(0.8)`)
        .on("end", () => {
          // Add a pause between movements
          setTimeout(moveBird, 1000); // 1 second pause
        });
    }

    // Start the bird movement after nodes are positioned
    setTimeout(moveBird, 1000);

    // Create the nodes with enhanced effects
    const defs = svg.append("defs");
    
    nodes.forEach((node, i) => {
      const glow = defs.append("filter")
        .attr("id", `glow-${i}`)
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");

      glow.append("feGaussianBlur")
        .attr("stdDeviation", "2")
        .attr("result", "coloredBlur");

      const feMerge = glow.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
    });

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 6)
      .attr("fill", d => d.color)
      .style("filter", (_, i) => `url(#glow-${i})`)
      .style("cursor", "pointer")
      .call(drag(simulation));

    // Add hover effects
    node.on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 8);

      // Highlight connected links
      link.style("stroke", function(l) {
        if (l.source === d || l.target === d) {
          return d.color;
        }
        return "rgba(255, 255, 255, 0.2)";
      })
      .style("stroke-opacity", function(l) {
        if (l.source === d || l.target === d) {
          return 1;
        }
        return 0.2;
      });
    })
    .on("mouseout", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 6);

      // Reset link styles
      link.style("stroke", "rgba(255, 255, 255, 0.2)")
          .style("stroke-opacity", 0.6);
    });

    // Add click handler with animation
    node.on("click", (event, d) => {
      setSelectedAgent(d);
      event.stopPropagation();
      
      // Add click animation
      d3.select(event.currentTarget)
        .transition()
        .duration(100)
        .attr("r", 8)
        .transition()
        .duration(100)
        .attr("r", 6);
    });

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, links]);

  // Drag handler
  const drag = (simulation: d3.Simulation<Node, undefined>) => {
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag<SVGCircleElement, Node>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  return (
    <div className="space-y-8">
      {/* Key Agent Profiles Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Agent Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedAgents.map(renderAgentCard)}
        </div>
      </div>

      {/* Network Visualization Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Social Network Visualization</h2>
          <p className="text-gray-600 leading-relaxed">
            This network visualization shows the interconnections between different agents in the system. 
            Hover over nodes to highlight their connections, and click to view detailed demographic information.
          </p>
        </div>
        <div className="relative">
          <div className="h-[600px] border rounded-lg bg-gray-900">
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              className="overflow-visible"
            />
          </div>
          
          {selectedAgent && (
            <div 
              className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64"
              style={{ 
                zIndex: 1000,
                animation: 'slideIn 0.3s ease-out'
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-lg">{selectedAgent.name}</h3>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Political View:</span>
                  <span className="text-gray-900 font-medium">{selectedAgent.demographics.political}</span>
                  <span className="text-gray-600">Vaccine Stance:</span>
                  <span className="text-gray-900 font-medium">{selectedAgent.demographics.attitude}</span>
                  <span className="text-gray-600">Age:</span>
                  <span className="text-gray-900">{selectedAgent.demographics.age}</span>
                  <span className="text-gray-600">Gender:</span>
                  <span className="text-gray-900">{selectedAgent.demographics.gender}</span>
                  <span className="text-gray-600">Education:</span>
                  <span className="text-gray-900">{selectedAgent.demographics.education}</span>
                  <span className="text-gray-600">Occupation:</span>
                  <span className="text-gray-900">{selectedAgent.demographics.occupation}</span>
                  <span className="text-gray-600">Religion:</span>
                  <span className="text-gray-900">{selectedAgent.demographics.religion}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentsTab;