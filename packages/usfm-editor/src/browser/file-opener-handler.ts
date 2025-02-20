// import { injectable, inject } from "@theia/core/shared/inversify";
// import {
//   OpenHandler,
//   OpenerOptions,
//   WidgetManager,
//   ApplicationShell,
// } from "@theia/core/lib/browser";
// import URI from "@theia/core/lib/common/uri";
// // import { MaybePromise } from '@theia/core/lib/common/types';
// import { CustomFileWidget } from "./custom-file-widget";

// @injectable()
// export class FileOpenHandler implements OpenHandler {
//   readonly id = "custom-file-open-handler";
//   readonly label = "Custom File Open Handler";

//   @inject(WidgetManager)
//   protected readonly widgetManager: WidgetManager;

//   @inject(ApplicationShell)
//   protected readonly shell: ApplicationShell;

//   canHandle(uri: URI): number {
//     return uri.path.ext.toLowerCase() === ".usj" ? 500 : 0;
//   }

//   async open(uri: URI, options?: OpenerOptions): Promise<CustomFileWidget> {
//     console.log("USJ File opened:", uri.toString());
//     const widget = await this.widgetManager.getOrCreateWidget<CustomFileWidget>(
//       CustomFileWidget.ID,
//       {
//         factoryId: CustomFileWidget.ID,
//       }
//     );
//     if (widget instanceof CustomFileWidget) {
//       await widget.setUri(uri);
//     }
//     if (!widget.isAttached) {
//       this.shell.addWidget(widget, { area: "main" });
//     }
//     this.shell.activateWidget(widget.id);
//     return widget;
//   }
// }

// // @injectable()
// // export class FileOpenHandler implements OpenHandler {
// //     readonly id = 'custom-file-open-handler';
// //     readonly label = 'Custom File Open Handler';

// //     @inject(WidgetManager)
// //     protected readonly widgetManager: WidgetManager;

// //     @inject(ApplicationShell)
// //     protected readonly shell: ApplicationShell;

// //     canHandle(uri: URI): number {
// //         return uri.path.ext.toLowerCase() === '.usfm' ? 500 : 0;
// //     }

// //     async open(uri: URI, options?: OpenerOptions): Promise<CustomFileWidget> {
// //         const widget = await this.widgetManager.getOrCreateWidget<CustomFileWidget>(CustomFileWidget.ID, {
// //             factoryId: CustomFileWidget.ID,
// //             created: async () => {
// //                 const w = new CustomFileWidget();
// //                 await w.setUri(uri);
// //                 return w;
// //             }
// //         });

// //         if (!widget.isAttached) {
// //             this.shell.addWidget(widget, { area: 'main' });
// //         }
// //         this.shell.activateWidget(widget.id);
// //         return widget;
// //     }
// // }


import { injectable, inject } from "@theia/core/shared/inversify";
import {
    OpenHandler,
    OpenerOptions,
    WidgetManager,
    ApplicationShell,
    Widget
} from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { CustomFileWidget } from "./custom-file-widget";
import { ArrayExt } from '@phosphor/algorithm';
// Make sure to import the type for TabBar; its import path may vary depending on your Theia version.
import { TabBar } from '@phosphor/widgets';

@injectable()
export class FileOpenHandler implements OpenHandler {
    readonly id = "custom-file-open-handler";
    readonly label = "Custom File Open Handler";

    @inject(WidgetManager)
    protected readonly widgetManager: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    canHandle(uri: URI): number {
        return uri.path.ext.toLowerCase() === ".usj" ? 500 : 0;
    }

    async open(uri: URI, options?: OpenerOptions): Promise<CustomFileWidget> {
        console.log("USJ File opened:", uri.toString());

        // Find existing widget for this URI
        const existingWidget = this.shell.widgets.find(widget => {
            if (widget instanceof CustomFileWidget) {
                const widgetUri = widget.getUri();
                return widgetUri && widgetUri.toString() === uri.toString();
            }
            return false;
        });

        if (existingWidget && existingWidget instanceof CustomFileWidget) {
            // If widget exists, activate it and ensure it's visible
            await this.shell.revealWidget(existingWidget.id);
            await this.shell.activateWidget(existingWidget.id);
            return existingWidget;
        }

        // Create new widget with unique ID
        const uniqueId = `${CustomFileWidget.ID}:${uri.toString()}`;
        const widget = await this.widgetManager.getOrCreateWidget<CustomFileWidget>(
            CustomFileWidget.ID,
            {
                factoryId: CustomFileWidget.ID,
                id: uniqueId
            }
        );

        if (widget instanceof CustomFileWidget) {
            await widget.setUri(uri);
        }

        // Get all widgets in the main area
        const mainAreaWidgets: Widget[] = [];
        const widgetIterator = this.shell.mainPanel.widgets();
        let current: Widget | undefined;
        while ((current = widgetIterator.next()) !== undefined) {
            mainAreaWidgets.push(current);
        }

        // Add widget to main area at the end if it's not already attached
        if (!widget.isAttached) {
            const ref = mainAreaWidgets.length > 0 ? mainAreaWidgets[mainAreaWidgets.length - 1] : undefined;
            await this.shell.addWidget(widget, {
                area: 'main',
                mode: 'tab-after',
                ref
            });
        }

        // Ensure the new widget is visible and active
        await this.shell.revealWidget(widget.id);
        await this.shell.activateWidget(widget.id);

        // Find and scroll the appropriate tab bar.
        // Call the tabBars function to get an iterator.
        const tabBarsIterator = this.shell.mainPanel.tabBars();
        // Here we assume that tabBarsIterator.next() returns a TabBar<Widget> or undefined.
        const tabBarsArray: TabBar<Widget>[] = [];
        let tabBar = tabBarsIterator.next();
        while (tabBar !== undefined) {
            tabBarsArray.push(tabBar);
            tabBar = tabBarsIterator.next();
        }

        // Iterate over the tab bars and find the tab whose title owner is our widget.
        for (const tabBar of tabBarsArray) {
            const index = ArrayExt.findFirstIndex(tabBar.titles, t => t.owner === widget);
            if (index !== -1) {
                tabBar.currentIndex = index;
                break;
            }
        }

        return widget;
    }
}
