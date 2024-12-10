// https://vike.dev/Head

import logoUrl from "../assets/logo.svg"
console.log(logoUrl)
export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
    </>
  )
}
