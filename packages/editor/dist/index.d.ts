import * as react from 'react';

declare const ReadonlyEditor: react.NamedExoticComponent<Omit<any, "ref"> & react.RefAttributes<HTMLDivElement>>;

declare const Renderer: react.ForwardRefExoticComponent<Omit<any, "ref"> & react.RefAttributes<HTMLDivElement>>;

declare function renderFlowJSON(data: any, options?: any): Promise<any>;

type Edge = any;
type Node = any;
type XYPosition = any;

declare function generateRoadmapFromText(markdown: string | any[]): {
    nodes: Node[];
    edges: Edge[];
};
declare function generateAIRoadmapFromText(markdown: string | any[]): {
    nodes: Node[];
    edges: Edge[];
};

export { type Edge, type Node, ReadonlyEditor, Renderer, type XYPosition, generateAIRoadmapFromText, generateRoadmapFromText, renderFlowJSON };
