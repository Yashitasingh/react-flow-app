// src/FlowComponent.js
import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import './FlowStyles.css'; // Import custom styles
import './FlowStyles.css'; // This should be correct


const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
];

const FlowComponent = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '70%' }}>
        <ReactFlow 
          nodes={initialNodes} 
          onNodeClick={onNodeClick} 
          fitView
          style={{ border: '1px solid #ddd', borderRadius: '8px' }} // Added border for aesthetics
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      <div style={{ width: '30%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {selectedNode ? (
          <div>
            <h3>Selected Node</h3>
            <p><strong>ID:</strong> {selectedNode.id}</p>
            <p><strong>Position:</strong> x - {selectedNode.position.x}, y - {selectedNode.position.y}</p>
          </div>
        ) : (
          <p>Select a node to see its details</p>
        )}
      </div>
    </div>
  );
};

export default FlowComponent;
