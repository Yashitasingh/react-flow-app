// src/CustomEdge.js
import React from 'react';
import { getBezierPath, EdgeLabelRenderer } from 'reactflow'; // Ensure getEdgeCenter is removed
import './CustomEdge.css'; // Import custom styles

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  onDeleteEdge, // Include onDeleteEdge as a prop
}) => {
  // Generate a horizontal Bezier path for the edge
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0, // Horizontal connectors: adjust curvature if needed
  });

  // Calculate edge center for label positioning
  const edgeCenterX = (sourceX + targetX) / 2;
  const edgeCenterY = (sourceY + targetY) / 2;

  const onDelete = (event) => {
    event.stopPropagation();
    if (onDeleteEdge) {
      onDeleteEdge(id); // Call the onDeleteEdge function with edge id
    }
  };

  return (
    <>
      <path
        id={id}
        style={{ stroke: '#555', strokeWidth: 2 }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${edgeCenterX}px,${edgeCenterY}px)`,
            padding: '4px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          <button
            onClick={onDelete}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f00',
              cursor: 'pointer',
            }}
            aria-label="Delete Edge"
          >
            ❌
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
