module.exports = {
    content: ["./index.html", "./src/**/*.{tsx,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                'xs': '475px',
                '3xl': '1920px',
                '4xl': '2560px',
            },
            maxWidth: {
                '8xl': '1440px',
                '9xl': '1920px',
                '10xl': '2560px',
            },
            colors: {
                primary: {
                    50: "#e3f2ff",
                    100: "#b6d9ff",
                    200: "#89c0ff",
                    300: "#5da7ff",
                    400: "#308eff",
                    500: "#2563eb",
                    600: "#1e4ecc",
                    700: "#1739aa",
                },
                accent: {
                    400: "#ff7e55",
                    500: "#ff6b35",
                    600: "#ff4f1a",
                },
                neon: {
                    blue: "#00e5ff",
                    purple: "#9d4bff",
                    pink: "#ff4dd6",
                },
                bg: {
                    900: "#05070f",
                    800: "#0b1020",
                    700: "#151b2f",
                },
            },
            boxShadow: {
                neon: "0 0 25px rgba(0,229,255,0.25)",
                'neon-lg': "0 0 40px rgba(0,229,255,0.4)",
                deep: "0 12px 50px rgba(0,0,0,0.45)",
                card: "0 8px 30px rgba(0,0,0,0.25)",
            },
            backdropBlur: {
                sm: "6px",
                md: "10px",
            },
            borderRadius: {
                card: "18px",
                tile: "20px",
                button: "12px",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                glow: "glow 3s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%,100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                glow: {
                    "0%,100%": { boxShadow: "0 0 20px rgba(0,229,255,0.4)" },
                    "50%": { boxShadow: "0 0 35px rgba(0,229,255,0.8)" },
                },
            },
        },
    },
    plugins: [],
};
