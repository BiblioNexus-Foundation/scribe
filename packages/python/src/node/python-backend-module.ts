import { ContainerModule } from "@theia/core/shared/inversify";
import {
  ConnectionHandler,
  RpcConnectionHandler,
} from "@theia/core/lib/common/messaging";
import { PythonService, PythonServicePath } from "../common/python-protocol";
import { PythonServiceImpl } from "./python-service";

export default new ContainerModule((bind) => {
  bind(PythonService).to(PythonServiceImpl).inSingletonScope();

  bind(ConnectionHandler)
    .toDynamicValue(
      (ctx) =>
        new RpcConnectionHandler(PythonServicePath, () =>
          ctx.container.get<PythonService>(PythonService)
        )
    )
    .inSingletonScope();
});
