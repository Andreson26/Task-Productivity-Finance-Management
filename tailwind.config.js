module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontWeight: {
        700: "700",
      }
    },
  },
  plugins: [],
}


