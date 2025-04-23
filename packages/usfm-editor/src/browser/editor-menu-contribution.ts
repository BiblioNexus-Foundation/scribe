// src/browser/editor-menu-contribution.ts
import { injectable } from "@theia/core/shared/inversify";
import { MenuContribution, MenuModelRegistry } from "@theia/core/lib/common/menu";
import { CommonMenus } from "@theia/core/lib/browser";
import { OpenEditorCommand } from "./open-editor-command";

@injectable()
export class EditorMenuContribution implements MenuContribution {
  registerMenus(menus: MenuModelRegistry): void {
    // Add to the File menu
    menus.registerMenuAction(CommonMenus.FILE_OPEN, {
      commandId: OpenEditorCommand.id,
      label: "Open Scripture Editor",
      order: "1",
    });

    menus.registerMenuAction(CommonMenus.VIEW, {
      commandId: OpenEditorCommand.id,
      label: "Scripture Editor",
      order: "10",
    });
  }
}
