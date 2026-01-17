// Initialize 3D graph on homepage
document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.getElementById('3d-graph');

    if (graphContainer && typeof ForceGraph3D !== 'undefined') {
        // Generate sample data
        const numNodes = 50;
        const nodes = [];
        const links = [];

        // Create nodes
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                id: i,
                name: `Node ${i}`,
                val: Math.random() * 20 + 5,
                group: Math.floor(Math.random() * 5)
            });
        }

        // Create links
        for (let i = 0; i < numNodes * 2; i++) {
            const source = Math.floor(Math.random() * numNodes);
            const target = Math.floor(Math.random() * numNodes);
            if (source !== target) {
                links.push({
                    source: source,
                    target: target
                });
            }
        }

        const data = { nodes, links };

        // Color palette
        const colors = ['#6366f1', '#8b5cf6', '#22d3ee', '#10b981', '#f59e0b'];

        // Initialize graph
        const graph = ForceGraph3D()(graphContainer)
            .graphData(data)
            .nodeLabel('name')
            .nodeAutoColorBy('group')
            .nodeOpacity(0.9)
            .linkOpacity(0.3)
            .linkWidth(1)
            .backgroundColor('#020617')
            .showNavInfo(false)
            .enableNodeDrag(false)
            .enableNavigationControls(true)
            .nodeColor(node => colors[node.group % colors.length]);

        // Auto-rotate camera
        let angle = 0;
        setInterval(() => {
            angle += 0.3;
            const distance = 300;
            graph.cameraPosition({
                x: distance * Math.sin(angle * Math.PI / 180),
                z: distance * Math.cos(angle * Math.PI / 180),
                y: 50
            });
        }, 50);

        // Highlight nodes on hover
        graph.onNodeHover(node => {
            graphContainer.style.cursor = node ? 'pointer' : 'default';
        });

        // Click to focus on node
        graph.onNodeClick(node => {
            const distance = 150;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

            graph.cameraPosition(
                {
                    x: node.x * distRatio,
                    y: node.y * distRatio,
                    z: node.z * distRatio
                },
                node,
                1000
            );
        });
    }
});
