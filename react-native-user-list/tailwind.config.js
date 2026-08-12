/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // shadcn/ui Lyra (Black & White) color palette
        background: "#FFFFFF",
        foreground: "#000000",
        card: "#FFFFFF",
        "card-foreground": "#000000",
        popover: "#FFFFFF",
        "popover-foreground": "#000000",
        primary: "#000000",
        "primary-foreground": "#FFFFFF",
        secondary: "#F5F5F5",
        "secondary-foreground": "#000000",
        muted: "#F5F5F5",
        "muted-foreground": "#737373",
        accent: "#F5F5F5",
        "accent-foreground": "#000000",
        destructive: "#000000",
        "destructive-foreground": "#FFFFFF",
        border: "#E5E5E5",
        input: "#E5E5E5",
        ring: "#000000",
        warning: "#FEF3C7",
        "warning-foreground": "#78350F",
      },
      borderRadius: {
        lg: "14px",
        md: "12px",
        sm: "10px",
      },
    },
  },
  plugins: [],
};
