import { ReactWidget } from "@theia/core/lib/browser";
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { ThemeService } from "@theia/core/lib/browser/theming";
import { Message } from "@theia/core/lib/browser/widgets/widget";
import * as React from "react";
import BibleNavigation from "./components/BibleNavigation";

const ExtensionAComponent = React.memo(() => {
  return <BibleNavigation />;
});

ExtensionAComponent.displayName = "ExtensionAComponent";

@injectable()
export class BcvNavigatorWidget extends ReactWidget {
  static readonly ID = "bcv-navigator:widget";
  static readonly LABEL = "BCV Navigator";

  @inject(ThemeService)
  protected readonly themeService!: ThemeService;

  constructor() {
    super();
    this.id = BcvNavigatorWidget.ID;
    this.title.label = BcvNavigatorWidget.LABEL;
    this.title.closable = true;
  }

  @postConstruct()
  protected init(): void {
    // Initialize theme immediately
    this.updateThemeClass();

    // Then set up the listener for future changes
    if (this.themeService) {
      this.themeService.onDidColorThemeChange(() => {
        this.updateThemeClass();
        this.update();
      });
    }

    // Force an initial update
    this.update();
  }

  public override processMessage(msg: Message): void {
    super.processMessage(msg);
    if (msg.type === "after-attach") {
      // Force theme update and widget update after attachment
      this.updateThemeClass();
      this.update();
    }
  }

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    const element = this.node;
    if (element && this.themeService) {
      // Remove existing theme classes
      element.classList.remove("light", "dark");

      // Get current theme and apply appropriate class
      const currentTheme = this.themeService.getCurrentTheme();
      const isDark = currentTheme.type === "dark";

      // Add theme class to widget
      element.classList.add(isDark ? "dark" : "light");

      // Add theme class to document root for Tailwind
      document.documentElement.classList.toggle("dark", isDark);

      // Add a base class for visibility
      element.classList.add("bcv-navigator-widget");
    }
  }

  protected render(): React.ReactNode {
    return (
      <div className="h-full w-full">
        <ExtensionAComponent />
      </div>
    );
  }
}
