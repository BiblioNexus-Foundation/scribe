import { ContainerModule } from 'inversify';
import { ConnectionHandler, RpcConnectionHandler } from '@theia/core/lib/common/messaging';
import { ProjectServiceBackend } from './project-backend-module';
import { ProjectServicePath, ProjectServer } from '../common/project-protocol';

export default new ContainerModule(bind => {
  bind(ProjectServer).to(ProjectServiceBackend).inSingletonScope();
  bind(ConnectionHandler)
    .toDynamicValue(
      (ctx) =>
        new RpcConnectionHandler(ProjectServicePath, () =>
          ctx.container.get<ProjectServer>(ProjectServer)
        )
    )
    .inSingletonScope();
});