import vikeReact from "vike-react/config"
import type { Config } from "vike/types"
import logoUrl from "../assets/logo.svg"

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout

  // https://vike.dev/head-tags
  title: "Slime Ascendant",
  description: "The Incremental Adventure",
  image: logoUrl,
  favicon: logoUrl,
  ssr: false,
  passToClient: ["user"],
  extends: vikeReact,
} satisfies Config
