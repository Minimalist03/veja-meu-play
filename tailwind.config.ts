import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      body: ["var(--font-body)"],
      heading: ["var(--font-heading)"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* ===== BACKGROUNDS ===== */
        background: "var(--background)",
        foreground: "var(--foreground)",

        /* ===== SURFACES ===== */
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "var(--surface-elevated)",
          hover: "var(--surface-hover)",
        },

        /* ===== TEXT COLORS ===== */
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },

        /* ===== PRIMARY (CTAs) ===== */
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
        },

        /* ===== ACCENT (Highlights) ===== */
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
        },

        /* ===== BORDERS ===== */
        border: {
          DEFAULT: "var(--border)",
          input: "var(--border-input)",
          focus: "var(--border-focus)",
        },

        /* ===== MUTED (Disabled/Subtle) ===== */
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        /* ===== POPOVER ===== */
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        /* ===== CARD ===== */
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ===== DESTRUCTIVE ===== */
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },

        /* ===== RING ===== */
        ring: "var(--ring)",

        /* ===== ESTADOS ===== */
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        error: {
          DEFAULT: "var(--error)",
          foreground: "var(--error-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },

        /* ===== INPUTS ===== */
        input: {
          DEFAULT: "hsl(var(--input-bg))",
          bg: "var(--input-bg)",
          border: "var(--input-border)",
          focus: "var(--input-focus)",
          disabled: "var(--input-disabled)",
        },

        /* ===== CORES RAW (para casos específicos) ===== */
        offwhite: "hsl(var(--color-offwhite))",
        beige: {
          light: "hsl(var(--color-beige-light))",
          medium: "hsl(var(--color-beige-medium))",
        },
        caramel: "hsl(var(--color-caramel))",
        brown: {
          dark: "hsl(var(--color-brown-dark))",
          darker: "hsl(var(--color-brown-darker))",
        },
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ===== SHADOWS ===== */
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },

      /* ===== ANIMATIONS ===== */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },

      /* ===== SPACING CUSTOMIZADO ===== */
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      /* ===== TYPOGRAPHY ===== */
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.16" }],
      },

      /* ===== Z-INDEX ===== */
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
