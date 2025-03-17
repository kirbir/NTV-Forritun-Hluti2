module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js}",
    "./pages/**/*.{html,js}"
    // Add other specific folders as needed, but avoid matching node_modules
  ],
  theme: {
    extend: {
      colors: {

        
        card: "hsl(0 0% 100%)",
        "card-foreground": "hsl(222.2 84% 4.9%)",
        
        popover: "hsl(0 0% 100%)",
        "popover-foreground": "hsl(222.2 84% 4.9%)",
        
        primary: "hsl(222.2 47.4% 11.2%)",
        "primary-foreground": "hsl(210 40% 98%)",
        
        secondary: "hsl(210 40% 96.1%)",
        "secondary-foreground": "hsl(222.2 47.4% 11.2%)",
        
        muted: "hsl(210 40% 96.1%)",
        "muted-foreground": "hsl(215.4 16.3% 46.9%)",
        
        accent: "hsl(210 40% 96.1%)",
        "accent-foreground": "hsl(222.2 47.4% 11.2%)",
        
        destructive: "hsl(0 84.2% 60.2%)",
        "destructive-foreground": "hsl(210 40% 98%)",
        
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(222.2 84% 4.9%)",
      },
    },
  },
  plugins: [],
}