import vikeReact from "vike-react/config"
import type { Config } from "vike/types"
import logoUrl from "../assets/logo.svg"

export default {
  title: "Slime Ascendant",
  description: "The Incremental Adventure",
  image: logoUrl,
  favicon: logoUrl,
  ssr: false,
  prerender: false,
  passToClient: ["user"],
  extends: "vike-react/config",
  stream: false,
  clientRouting: true,
} satisfies Config
