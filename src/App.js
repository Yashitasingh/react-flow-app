import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Handle,
    addEdge,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import './App.css';

const initialNodes = [
    { id: '1', type: 'customNode', position: { x: 400, y: 100 }, data: { label: 'Node 1', content: 'Content for Node 1' } },
    { id: '2', type: 'customNode', position: { x: 200, y: 300 }, data: { label: 'Node 2', content: 'Content for Node 2' } },
    { id: '3', type: 'customNode', position: { x: 400, y: 500 }, data: { label: 'Node 3', content: 'Content for Node 3' } },
    { id: '4', type: 'customNode', position: { x: 600, y: 300 }, data: { label: 'Node 4', content: 'Content for Node 4' } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'rightSource', targetHandle: 'leftTarget', type: 'straight' },
    { id: 'e2-3', source: '2', target: '3', sourceHandle: 'bottomSource', targetHandle: 'topTarget', type: 'straight' },
    { id: 'e3-4', source: '3', target: '4', sourceHandle: 'rightSource', targetHandle: 'leftTarget', type: 'straight' },
    { id: 'e4-1', source: '4', target: '1', sourceHandle: 'topSource', targetHandle: 'bottomTarget', type: 'straight' },
];

const CustomNode = ({ data }) => (
    <div style={{ padding: 10, border: '1px solid black', borderRadius: 5, backgroundColor: 'white' }}>
        <h3>{data.label}</h3>
        <p>{data.content}</p>
        <Handle type="source" position="top" id="topSource" />
        <Handle type="source" position="bottom" id="bottomSource" />
        <Handle type="source" position="left" id="leftSource" />
        <Handle type="source" position="right" id="rightSource" />
        <Handle type="target" position="top" id="topTarget" />
        <Handle type="target" position="bottom" id="bottomTarget" />
        <Handle type="target" position="left" id="leftTarget" />
        <Handle type="target" position="right" id="rightTarget" />
    </div>
);

const App = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [newNodeLabel, setNewNodeLabel] = useState('');
    const [newNodeContent, setNewNodeContent] = useState('');
    const [selectedEdge, setSelectedEdge] = useState(null); // State to hold selected edge

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: 'straight' }, eds)),
        [setEdges]
    );

    const onNodeClick = (event, node) => {
        event.stopPropagation();
        setSelectedNode(node);
        setSelectedEdge(null); // Reset selected edge when a node is clicked
    };

    const onEdgeClick = (event, edge) => {
        event.stopPropagation();
        setSelectedEdge(edge); // Set the selected edge
        setSelectedNode(null); // Reset selected node when an edge is clicked
    };

    const onEdgeRightClick = (event, edge) => {
        event.preventDefault();
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && selectedEdge) {
            setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
            setSelectedEdge(null); // Clear selected edge after deletion
        }
    };

    useEffect(() => {
        // Add keydown event listener
        window.addEventListener('keydown', handleKeyDown);
       
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedEdge]); // Re-run effect when selectedEdge changes

    const addNode = () => {
        if (newNodeLabel && newNodeContent) {
            const newNode = {
                id: (nodes.length + 1).toString(),
                type: 'customNode',
                position: { x: Math.random() * 600, y: Math.random() * 400 },
                data: { label: newNodeLabel, content: newNodeContent },
            };
            setNodes((nds) => nds.concat(newNode));
            setNewNodeLabel('');
            setNewNodeContent('');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    onEdgeClick={onEdgeClick} // Add onEdgeClick handler
                    onEdgeContextMenu={onEdgeRightClick}
                    nodeTypes={{ customNode: CustomNode }}
                    fitView
                >
                    <MiniMap />
                    <Controls />
                    {selectedNode && (
                        <div
                            style={{
                                position: 'absolute',
                                top: selectedNode.position.y + 50,
                                left: selectedNode.position.x + 50,
                                padding: '5px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid black',
                                borderRadius: '5px',
                                pointerEvents: 'none',
                            }}
                        >
                            <p>Coordinates: ({selectedNode.position.x}, {selectedNode.position.y})</p>
                        </div>
                    )}
                </ReactFlow>
            </div>
            <div style={{ width: '300px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                <h2>Taskbar</h2>
                {selectedNode ? (
                    <div>
                        <h3>Node Selected: {selectedNode.data.label}</h3>
                        <p>Coordinates: ({selectedNode.position.x}, {selectedNode.position.y})</p>
                    </div>
                ) : (
                    <p>No node selected</p>
                )}
                {selectedEdge && <h3>Edge Selected: {selectedEdge.id}</h3>} {/* Display selected edge */}
                <h3>Add New Node</h3>
                <input
                    type="text"
                    placeholder="Heading"
                    value={newNodeLabel}
                    onChange={(e) => setNewNodeLabel(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={newNodeContent}
                    onChange={(e) => setNewNodeContent(e.target.value)}
                />
                <button onClick={addNode}>Add Node</button>
            </div>
        </div>
    );
};

export default App;

