export const PythonServicePath = "/services/python";

export const PythonService = Symbol("PythonService");

export interface PythonService {
  setupEnvironment(): Promise<void>;
  setupWildebeest(): Promise<void>;
  executeWildebeest(text: string): Promise<string>;
}
