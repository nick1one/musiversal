export interface SampleData {
  sampleName: string;
  duration: number;
  color?: string;
}

export interface EditorBlock {
  id: string;
  size: number;
  sample: SampleData;
}
