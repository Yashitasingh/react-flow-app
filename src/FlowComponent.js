// src/FlowComponent.js
import React, { useState, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import CustomEdge from './CustomEdge'; // Import CustomEdge
import 'reactflow/dist/style.css'; // Import default styles

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }, // Example edges
];

const FlowComponent = () => {
  const [edges, setEdges] = useState(initialEdges);

  const onDeleteEdge = useCallback(
    (edgeId) => {
      setEdges((eds) => eds.filter((e) => e.id !== edgeId)); // Delete edge by ID
    },
    [setEdges]
  );

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={[]} // Add your nodes here
        edges={edges}
        edgeTypes={{ customEdge: CustomEdge }} // Use CustomEdge type
        onEdgeClick={(event, edge) => {
          // Optional: Handle edge click
        }}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
        {edges.map((edge) => (
          <CustomEdge key={edge.id} {...edge} onDeleteEdge={onDeleteEdge} /> // Pass down onDeleteEdge
        ))}
      </ReactFlow>
    </div>
  );
};

export default FlowComponent;
