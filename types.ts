export enum UnitId {
  UNIT_II = 'UNIT_II',
  UNIT_III = 'UNIT_III',
  UNIT_IV = 'UNIT_IV',
}

export enum SimulationType {
  CONSOLE = 'CONSOLE', // Standard text input/output
  PATTERN = 'PATTERN', // For star/number patterns
  CHART = 'CHART', // For graphing or visual stats
  INTERACTIVE_FORM = 'INTERACTIVE_FORM', // For things like BMI, Temperature
}

export interface TestCase {
  input: string;
  output: string;
}

export interface ProblemDetails {
  explanation: string;
  formula?: string;
  inputAnalysis: string;
  logicConstruction: string;
  testCases: TestCase[];
}

export interface LabProblem {
  id: string;
  title: string;
  description: string;
  details: ProblemDetails; // New detailed content
  algorithm: string[]; // List of steps
  cCode: string;
  simulationType: SimulationType;
  defaultInputs?: Record<string, any>;
}

export interface LabUnit {
  id: UnitId;
  title: string;
  problems: LabProblem[];
}