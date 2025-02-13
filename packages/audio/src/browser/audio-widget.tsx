import * as React from 'react';
import {
	injectable,
	postConstruct,
	inject,
} from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { AudioPanel } from '../components/AudioPanel';
import { ThemeService } from '@theia/core/lib/browser/theming';

@injectable()
export class AudioWidget extends ReactWidget {
	static readonly ID = 'audio:widget';
	static readonly LABEL = 'Audio Widget';

	@inject(ThemeService)
	protected readonly themeService: ThemeService;

	private currentTheme: string;

	@postConstruct()
	protected init(): void {
		this.doInit();
	}

	protected async doInit(): Promise<void> {
		this.id = AudioWidget.ID;
		this.title.label = AudioWidget.LABEL;
		this.title.caption = AudioWidget.LABEL;
		this.title.closable = true;
		this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.

		// Set initial theme
		this.currentTheme = this.themeService.getCurrentTheme().type;

		// Subscribe to theme changes
		this.themeService.onDidColorThemeChange(() => {
			this.handleThemeChange();
		});

		this.update(); // Force initial render
	}

	// Handles theme change and updates widget state
	protected handleThemeChange(): void {
		const newTheme = this.themeService.getCurrentTheme().type;
		console.log('In theme change', newTheme);
		if (this.currentTheme !== newTheme) {
			this.currentTheme = newTheme;
			this.update(); // Trigger re-render
		}
	}

	render(): React.ReactElement {
		// Render AudioPanel with the current theme
		return <AudioPanel theme={this.currentTheme} />;
	}
}
