export function someFunction() {
    console.log("This is a utility function from roadmapUtils.");
}

export function generateAIRoadmapFromText(input: { nodes: any[]; edges: any[] }) {
  // İşleme mantığı burada
  return {
    nodes: input.nodes.map((node) => ({ ...node, processed: true })),
    edges: input.edges.map((edge) => ({ ...edge, processed: true })),
  };
}
