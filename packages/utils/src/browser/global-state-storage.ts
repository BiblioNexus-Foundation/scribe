import { Emitter } from '@theia/core';
import { injectable } from '@theia/core/shared/inversify';
import { Disposable } from '@theia/core/lib/common/disposable';
import { WorkspaceStorageService } from '@theia/workspace/lib/browser/workspace-storage-service';

export interface GlobalStateEvent<T = unknown> {
  key: string;
  data: T;
}

@injectable()
export class GlobalStateStorage extends WorkspaceStorageService {
  private readonly setDataEmitter = new Emitter<GlobalStateEvent>();
  readonly onDidUpdateEvent = this.setDataEmitter.event;

  override setData<T>(key: string, data: T): Promise<void> {
    const result = super.setData(key, data);
    this.setDataEmitter.fire({ key, data });
    return result;
  }

  /**
   * Register a callback function to be invoked when the specified key's data changes.
   * @param key The storage key to watch for changes
   * @param listener The callback function to invoke when the data changes
   * @returns A disposable that can be used to stop listening for changes
   */
  onUpdate<T>(key: string, listener: (data: T) => void): Disposable {
    const disposable = this.onDidUpdateEvent((e) => {
      if (e.key === key) {
        listener(e.data as T);
      }
    });

    return disposable;
  }
}
