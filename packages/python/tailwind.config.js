export const darkMode = "class";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        custom: "8px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "var(--theia-button-background)",
        "primary-50": "var(--theia-selection-background)",
        secondary: "var(--theia-editor-foreground)",
        success: "var(--theia-successBackground)",
        error: "var(--theia-errorBackground)",
        validation: "var(--theia-inputValidation-errorBackground)",
        light: "var(--theia-editor-background)",
        dark: "var(--theia-editor-foreground)",
        border: "var(--theia-editorWidget-border)",
        input: "var(--theia-input-background)",
        ring: "var(--theia-focusBorder)",
        background: "var(--theia-editor-background)",
        foreground: "var(--theia-editor-foreground)",
        destructive: {
          DEFAULT: "var(--theia-errorBackground)",
          foreground: "var(--theia-statusBarItem-errorForeground)",
        },
        muted: {
          DEFAULT: "var(--theia-descriptionForeground)",
          foreground: "var(--theia-disabledForeground)",
        },
        accent: {
          DEFAULT: "var(--theia-textLink-foreground)",
          foreground: "var(--theia-textLink-activeForeground)",
        },
        popover: {
          DEFAULT: "var(--theia-editorWidget-background)",
          foreground: "var(--theia-editorWidget-foreground)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        table: {
          header: "var(--theia-editorWidget-background)",
          row: "var(--theia-list-hoverBackground)",
          border: "var(--theia-list-inactiveSelectionBackground)",
        },
        dropdown: {
          background: "var(--theia-dropdown-background)",
          border: "var(--theia-dropdown-border)",
          text: "var(--theia-dropdown-foreground)",
        },
        "secondary-foreground": "var(--theia-button-secondaryForeground)",
        "destructive-foreground": "var(--theia-statusBarItem-errorForeground)",
        "disabled-foreground": "var(--theia-disabledForeground)",
        "error-foreground": "var(--theia-errorForeground)",
        "description-foreground": "var(--theia-descriptionForeground)",
        "icon-foreground": "var(--theia-icon-foreground)",
        "focus-border": "var(--theia-focusBorder)",
        "selection-background": "var(--theia-selection-background)",
        "text-separator": "var(--theia-textSeparator-foreground)",
        "text-link": {
          DEFAULT: "var(--theia-textLink-foreground)",
          active: "var(--theia-textLink-activeForeground)",
        },
        "text-preformat": "var(--theia-textPreformat-foreground)",
        "text-blockquote": {
          background: "var(--theia-textBlockQuote-background)",
          border: "var(--theia-textBlockQuote-border)",
        },
        "text-codeblock": {
          background: "var(--theia-textCodeBlock-background)",
        },
        widget: {
          shadow: "var(--theia-widget-shadow)",
        },
        input: {
          DEFAULT: "var(--theia-input-background)",
          foreground: "var(--theia-input-foreground)",
          placeholder: "var(--theia-input-placeholderForeground)",
          option: {
            active: {
              border: "var(--theia-inputOption-activeBorder)",
              background: "var(--theia-inputOption-activeBackground)",
              foreground: "var(--theia-inputOption-activeForeground)",
            },
            hover: {
              background: "var(--theia-inputOption-hoverBackground)",
            },
          },
          validation: {
            info: {
              background: "var(--theia-inputValidation-infoBackground)",
              border: "var(--theia-inputValidation-infoBorder)",
            },
            warning: {
              background: "var(--theia-inputValidation-warningBackground)",
              border: "var(--theia-inputValidation-warningBorder)",
            },
            error: {
              background: "var(--theia-inputValidation-errorBackground)",
              border: "var(--theia-inputValidation-errorBorder)",
            },
          },
        },
        button: {
          DEFAULT: "var(--theia-button-background)",
          foreground: "var(--theia-button-foreground)",
          separator: "var(--theia-button-separator)",
          hover: "var(--theia-button-hoverBackground)",
          secondary: {
            DEFAULT: "var(--theia-button-secondaryBackground)",
            foreground: "var(--theia-button-secondaryForeground)",
            hover: "var(--theia-button-secondaryHoverBackground)",
          },
        },
        badge: {
          DEFAULT: "var(--theia-badge-background)",
          foreground: "var(--theia-badge-foreground)",
        },
        scrollbar: {
          shadow: "var(--theia-scrollbar-shadow)",
          slider: {
            DEFAULT: "var(--theia-scrollbarSlider-background)",
            hover: "var(--theia-scrollbarSlider-hoverBackground)",
            active: "var(--theia-scrollbarSlider-activeBackground)",
          },
        },
        "progress-bar": "var(--theia-progressBar-background)",
        editor: {
          error: "var(--theia-editorError-foreground)",
          warning: "var(--theia-editorWarning-foreground)",
          info: "var(--theia-editorInfo-foreground)",
          hint: "var(--theia-editorHint-foreground)",
        },
        "editor-background": "var(--theia-editor-background)",
        "editor-foreground": "var(--theia-editor-foreground)",
        "editor-sticky-scroll": {
          DEFAULT: "var(--theia-editorStickyScroll-background)",
          hover: "var(--theia-editorStickyScrollHover-background)",
        },
        "editor-widget": {
          background: "var(--theia-editorWidget-background)",
          foreground: "var(--theia-editorWidget-foreground)",
          border: "var(--theia-editorWidget-border)",
        },
        "quick-input": {
          background: "var(--theia-quickInput-background)",
          foreground: "var(--theia-quickInput-foreground)",
          title: {
            background: "var(--theia-quickInputTitle-background)",
          },
        },
        "picker-group": {
          foreground: "var(--theia-pickerGroup-foreground)",
          border: "var(--theia-pickerGroup-border)",
        },
        "keybinding-label": {
          background: "var(--theia-keybindingLabel-background)",
          foreground: "var(--theia-keybindingLabel-foreground)",
          border: "var(--theia-keybindingLabel-border)",
          "bottom-border": "var(--theia-keybindingLabel-bottomBorder)",
        },
        "editor-selection": {
          DEFAULT: "var(--theia-editor-selectionBackground)",
          inactive: "var(--theia-editor-inactiveSelectionBackground)",
          highlight: "var(--theia-editor-selectionHighlightBackground)",
        },
        "editor-find": {
          match: "var(--theia-editor-findMatchBackground)",
          highlight: "var(--theia-editor-findMatchHighlightBackground)",
          range: "var(--theia-editor-findRangeHighlightBackground)",
        },
        "search-editor": {
          match: "var(--theia-searchEditor-findMatchBackground)",
        },
        "search-results-info": "var(--theia-search-resultsInfoForeground)",
        "editor-hover": {
          highlight: "var(--theia-editor-hoverHighlightBackground)",
          widget: {
            background: "var(--theia-editorHoverWidget-background)",
            foreground: "var(--theia-editorHoverWidget-foreground)",
            border: "var(--theia-editorHoverWidget-border)",
            "status-bar": "var(--theia-editorHoverWidget-statusBarBackground)",
          },
        },
        "editor-link": {
          active: "var(--theia-editorLink-activeForeground)",
        },
        "editor-inlay-hint": {
          DEFAULT: {
            foreground: "var(--theia-editorInlayHint-foreground)",
            background: "var(--theia-editorInlayHint-background)",
          },
          type: {
            foreground: "var(--theia-editorInlayHint-typeForeground)",
            background: "var(--theia-editorInlayHint-typeBackground)",
          },
          parameter: {
            foreground: "var(--theia-editorInlayHint-parameterForeground)",
            background: "var(--theia-editorInlayHint-parameterBackground)",
          },
        },
        "editor-lightbulb": {
          DEFAULT: "var(--theia-editorLightBulb-foreground)",
          autofix: "var(--theia-editorLightBulbAutoFix-foreground)",
        },
        "diff-editor": {
          "inserted-text": "var(--theia-diffEditor-insertedTextBackground)",
          "removed-text": "var(--theia-diffEditor-removedTextBackground)",
          "inserted-line": "var(--theia-diffEditor-insertedLineBackground)",
          "removed-line": "var(--theia-diffEditor-removedLineBackground)",
          "diagonal-fill": "var(--theia-diffEditor-diagonalFill)",
          "unchanged-region": {
            background: "var(--theia-diffEditor-unchangedRegionBackground)",
            foreground: "var(--theia-diffEditor-unchangedRegionForeground)",
          },
          "unchanged-code": "var(--theia-diffEditor-unchangedCodeBackground)",
        },
        list: {
          "focus-outline": "var(--theia-list-focusOutline)",
          "active-selection": {
            background: "var(--theia-list-activeSelectionBackground)",
            foreground: "var(--theia-list-activeSelectionForeground)",
            icon: "var(--theia-list-activeSelectionIconForeground)",
          },
          "inactive-selection": "var(--theia-list-inactiveSelectionBackground)",
          hover: "var(--theia-list-hoverBackground)",
          drop: "var(--theia-list-dropBackground)",
          highlight: "var(--theia-list-highlightForeground)",
          "focus-highlight": "var(--theia-list-focusHighlightForeground)",
          "invalid-item": "var(--theia-list-invalidItemForeground)",
          error: "var(--theia-list-errorForeground)",
          warning: "var(--theia-list-warningForeground)",
        },
        "list-filter-widget": {
          background: "var(--theia-listFilterWidget-background)",
          outline: "var(--theia-listFilterWidget-outline)",
          "no-matches": "var(--theia-listFilterWidget-noMatchesOutline)",
          shadow: "var(--theia-listFilterWidget-shadow)",
          "filter-match": "var(--theia-list-filterMatchBackground)",
        },
        tree: {
          "indent-guides": "var(--theia-tree-indentGuidesStroke)",
          "inactive-indent-guides":
            "var(--theia-tree-inactiveIndentGuidesStroke)",
          "table-columns-border": "var(--theia-tree-tableColumnsBorder)",
          "table-odd-rows": "var(--theia-tree-tableOddRowsBackground)",
        },
        "list-deemphasized": "var(--theia-list-deemphasizedForeground)",
        checkbox: {
          DEFAULT: "var(--theia-checkbox-background)",
          select: {
            background: "var(--theia-checkbox-selectBackground)",
            border: "var(--theia-checkbox-selectBorder)",
          },
          foreground: "var(--theia-checkbox-foreground)",
          border: "var(--theia-checkbox-border)",
        },
        menu: {
          border: "var(--theia-menu-border)",
          foreground: "var(--theia-menu-foreground)",
          background: "var(--theia-menu-background)",
          "selection-foreground": "var(--theia-menu-selectionForeground)",
          "selection-background": "var(--theia-menu-selectionBackground)",
          "separator-background": "var(--theia-menu-separatorBackground)",
        },
        toolbar: {
          hover: "var(--theia-toolbar-hoverBackground)",
          active: "var(--theia-toolbar-activeBackground)",
        },
        "editor-snippet": {
          "tabstop-highlight":
            "var(--theia-editor-snippetTabstopHighlightBackground)",
          "final-tabstop-border":
            "var(--theia-editor-snippetFinalTabstopHighlightBorder)",
        },
        breadcrumb: {
          foreground: "var(--theia-breadcrumb-foreground)",
          background: "var(--theia-breadcrumb-background)",
          "focus-foreground": "var(--theia-breadcrumb-focusForeground)",
          "active-selection":
            "var(--theia-breadcrumb-activeSelectionForeground)",
          picker: {
            background: "var(--theia-breadcrumbPicker-background)",
          },
        },
        merge: {
          "current-header": "var(--theia-merge-currentHeaderBackground)",
          "current-content": "var(--theia-merge-currentContentBackground)",
          "incoming-header": "var(--theia-merge-incomingHeaderBackground)",
          "incoming-content": "var(--theia-merge-incomingContentBackground)",
          "common-header": "var(--theia-merge-commonHeaderBackground)",
          "common-content": "var(--theia-merge-commonContentBackground)",
        },
        "overview-ruler": {
          "current-content":
            "var(--theia-editorOverviewRuler-currentContentForeground)",
          "incoming-content":
            "var(--theia-editorOverviewRuler-incomingContentForeground)",
          "common-content":
            "var(--theia-editorOverviewRuler-commonContentForeground)",
          "find-match": "var(--theia-editorOverviewRuler-findMatchForeground)",
          "selection-highlight":
            "var(--theia-editorOverviewRuler-selectionHighlightForeground)",
        },
        minimap: {
          "find-match": "var(--theia-minimap-findMatchHighlight)",
          "selection-occurrence":
            "var(--theia-minimap-selectionOccurrenceHighlight)",
          selection: "var(--theia-minimap-selectionHighlight)",
          info: "var(--theia-minimap-infoHighlight)",
          warning: "var(--theia-minimap-warningHighlight)",
          error: "var(--theia-minimap-errorHighlight)",
          "foreground-opacity": "var(--theia-minimap-foregroundOpacity)",
          slider: {
            background: "var(--theia-minimapSlider-background)",
            hover: "var(--theia-minimapSlider-hoverBackground)",
            active: "var(--theia-minimapSlider-activeBackground)",
          },
        },
        problems: {
          error: "var(--theia-problemsErrorIcon-foreground)",
          warning: "var(--theia-problemsWarningIcon-foreground)",
          info: "var(--theia-problemsInfoIcon-foreground)",
        },
        charts: {
          foreground: "var(--theia-charts-foreground)",
          lines: "var(--theia-charts-lines)",
          red: "var(--theia-charts-red)",
          blue: "var(--theia-charts-blue)",
          yellow: "var(--theia-charts-yellow)",
          orange: "var(--theia-charts-orange)",
          green: "var(--theia-charts-green)",
          purple: "var(--theia-charts-purple)",
        },
        terminal: {
          background: "var(--theia-terminal-background)",
          foreground: "var(--theia-terminal-foreground)",
          "selection-background": "var(--theia-terminal-selectionBackground)",
          "inactive-selection":
            "var(--theia-terminal-inactiveSelectionBackground)",
          border: "var(--theia-terminal-border)",
          ansi: {
            black: "var(--theia-terminal-ansiBlack)",
            red: "var(--theia-terminal-ansiRed)",
            green: "var(--theia-terminal-ansiGreen)",
            yellow: "var(--theia-terminal-ansiYellow)",
            blue: "var(--theia-terminal-ansiBlue)",
            magenta: "var(--theia-terminal-ansiMagenta)",
            cyan: "var(--theia-terminal-ansiCyan)",
            white: "var(--theia-terminal-ansiWhite)",
            "bright-black": "var(--theia-terminal-ansiBrightBlack)",
            "bright-red": "var(--theia-terminal-ansiBrightRed)",
            "bright-green": "var(--theia-terminal-ansiBrightGreen)",
            "bright-yellow": "var(--theia-terminal-ansiBrightYellow)",
            "bright-blue": "var(--theia-terminal-ansiBrightBlue)",
            "bright-magenta": "var(--theia-terminal-ansiBrightMagenta)",
            "bright-cyan": "var(--theia-terminal-ansiBrightCyan)",
            "bright-white": "var(--theia-terminal-ansiBrightWhite)",
          },
        },
        debug: {
          "stack-frame-highlight":
            "var(--theia-editor-stackFrameHighlightBackground)",
          "focused-stack-frame-highlight":
            "var(--theia-editor-focusedStackFrameHighlightBackground)",
        },
        "status-bar-debugging": {
          background: "var(--theia-statusBar-debuggingBackground)",
          foreground: "var(--theia-statusBar-debuggingForeground)",
        },
        "debug-exception": {
          border: "var(--theia-debugExceptionWidget-border)",
          background: "var(--theia-debugExceptionWidget-background)",
        },
        "debug-icon": {
          breakpoint: "var(--theia-debugIcon-breakpointForeground)",
          "breakpoint-disabled":
            "var(--theia-debugIcon-breakpointDisabledForeground)",
          "breakpoint-unverified":
            "var(--theia-debugIcon-breakpointUnverifiedForeground)",
          "breakpoint-current":
            "var(--theia-debugIcon-breakpointCurrentStackframeForeground)",
          "breakpoint-stack":
            "var(--theia-debugIcon-breakpointStackframeForeground)",
          start: "var(--theia-debugIcon-startForeground)",
          pause: "var(--theia-debugIcon-pauseForeground)",
          stop: "var(--theia-debugIcon-stopForeground)",
          disconnect: "var(--theia-debugIcon-disconnectForeground)",
          restart: "var(--theia-debugIcon-restartForeground)",
          "step-over": "var(--theia-debugIcon-stepOverForeground)",
          "step-into": "var(--theia-debugIcon-stepIntoForeground)",
          "step-out": "var(--theia-debugIcon-stepOutForeground)",
          continue: "var(--theia-debugIcon-continueForeground)",
          "step-back": "var(--theia-debugIcon-stepBackForeground)",
        },
        "debug-console": {
          info: "var(--theia-debugConsole-infoForeground)",
          warning: "var(--theia-debugConsole-warningForeground)",
          error: "var(--theia-debugConsole-errorForeground)",
          source: "var(--theia-debugConsole-sourceForeground)",
          "input-icon": "var(--theia-debugConsoleInputIcon-foreground)",
        },
        notebook: {
          "cell-border": "var(--theia-notebook-cellBorderColor)",
          "focused-editor": "var(--theia-notebook-focusedEditorBorder)",
          "status-success": "var(--theia-notebookStatusSuccessIcon-foreground)",
          "status-error": "var(--theia-notebookStatusErrorIcon-foreground)",
          "status-running": "var(--theia-notebookStatusRunningIcon-foreground)",
          "cell-toolbar-separator":
            "var(--theia-notebook-cellToolbarSeparator)",
          "selected-cell": {
            background: "var(--theia-notebook-selectedCellBackground)",
            border: "var(--theia-notebook-selectedCellBorder)",
          },
          "focused-cell": {
            border: "var(--theia-notebook-focusedCellBorder)",
            "inactive-border":
              "var(--theia-notebook-inactiveFocusedCellBorder)",
          },
          "cell-statusbar-item": {
            hover: "var(--theia-notebook-cellStatusBarItemHoverBackground)",
          },
          "cell-insertion-indicator":
            "var(--theia-notebook-cellInsertionIndicator)",
          scrollbar: {
            DEFAULT: "var(--theia-notebookScrollbarSlider-background)",
            hover: "var(--theia-notebookScrollbarSlider-hoverBackground)",
            active: "var(--theia-notebookScrollbarSlider-activeBackground)",
          },
          "symbol-highlight": "var(--theia-notebook-symbolHighlightBackground)",
          "cell-editor": {
            background: "var(--theia-notebook-cellEditorBackground)",
          },
        },
        "git-decoration": {
          added: "var(--theia-gitDecoration-addedResourceForeground)",
          modified: "var(--theia-gitDecoration-modifiedResourceForeground)",
          deleted: "var(--theia-gitDecoration-deletedResourceForeground)",
          untracked: "var(--theia-gitDecoration-untrackedResourceForeground)",
          conflicting:
            "var(--theia-gitDecoration-conflictingResourceForeground)",
        },
        gitlens: {
          "gutter-background": "var(--theia-gitlens-gutterBackgroundColor)",
          "gutter-foreground": "var(--theia-gitlens-gutterForegroundColor)",
          "line-highlight": "var(--theia-gitlens-lineHighlightBackgroundColor)",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
