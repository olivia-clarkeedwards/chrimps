import defaultTheme from "tailwindcss/defaultTheme"

import type { Config } from "tailwindcss"

export default {
  content: ["./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        islam: "#009000",
      },
      fontFamily: {
        sans: ["Sigmar", ...defaultTheme.fontFamily.sans],
      },
      cursor: {
        fancy: "url(/icons/pointerhand.png) 16 16, pointer",
        dagger: "url(/icons/dagger64.png) 16 16, pointer",
      },
      scale: {
        "85": ".85",
        "80": ".80",
      },
      boxShadow: {
        upgrade:
          "inset 5px 5px 13px #fb923c, inset -5px -5px 13px #2e1065, -5px -5px 5px rgb(251 146 60), 3px 5px 25px #2e1065",
        combat: "inset 5px 5px 13px #7e22ce, inset -5px -5px 13px #2e1065",
        panel: "inset 5px 5px 13px #fb923c, inset -5px -5px 13px #2e1065",
        "zone-pocket": "inset 8px 8px 16px #31104c,inset -8px -8px 16px #7f28c2",
      },
      borderRadius: {
        nm: "61px",
      },
      gradientColorStops: {
        nm: "linear-gradient(145deg, orange, purple)",
      },
    },
  },
  plugins: [],
} satisfies Config
