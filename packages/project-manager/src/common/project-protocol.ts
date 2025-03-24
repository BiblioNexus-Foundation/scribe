import { RpcServer } from "@theia/core";

export const ProjectServicePath = '/services/ProjectServer';
export const ProjectServer = Symbol('ProjectServer');
export interface ProjectServer extends RpcServer<void> {
  validateUSFM(data: string): Promise<{success: boolean, message: string}>;
  sayHelloTo(name: string): Promise<string>;
  saveToFile(data: any, filename: string): Promise<boolean>;
}