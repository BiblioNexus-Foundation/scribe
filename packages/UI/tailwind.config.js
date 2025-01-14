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
