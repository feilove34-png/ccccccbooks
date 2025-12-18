export interface Quote {
  text: string;
  context?: string; // Optional context or page number if hallucinated correctly, but we'll focus on the quote itself
  sentiment: string; // A short keyword describing the vibe of the quote (e.g., "Melancholy", "Inspiring")
}

export interface MindMapNode {
  label: string;
  children?: MindMapNode[];
}

export interface BookAnalysis {
  title: string;
  author: string;
  quotes: Quote[];
  summary: string;
  extendedInterpretation: string; // Markdown formatted deep dive
  mindMap: MindMapNode;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}