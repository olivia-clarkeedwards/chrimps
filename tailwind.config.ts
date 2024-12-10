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
    },
  },
  plugins: [],
} satisfies Config
