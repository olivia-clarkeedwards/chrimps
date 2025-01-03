import vikeReact from "vike-react/config"
import type { Config } from "vike/types"

export default {
  title: "Slime Ascendant",
  description: "The Incremental Adventure",
  image: "icons/logo.svg",
  favicon: "icons/logo.svg",
  ssr: false,
  prerender: false,
  passToClient: ["user"],
  extends: vikeReact,
  stream: false,
  clientRouting: true,
} satisfies Config
