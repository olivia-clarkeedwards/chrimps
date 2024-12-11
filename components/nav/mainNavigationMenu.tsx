export function MainNavigationMenu() {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-900 text-white h-full px-3 py-2">
      <div className="flex flex-wrap gap-3 items-center">
        <NavigationLinkButton text="Home" linkTo="" />
        <NavigationLinkButton text="Combat" linkTo="/combat" />
        <NavigationLinkButton text="Inventory" linkTo="/inventory" />
        <NavigationLinkButton text="Settings" linkTo="/settings" />
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <NavigationLinkButton text="Save" linkTo="/save" />
        <NavigationLinkButton text="Load" linkTo="/load" />
      </div>
    </div>
  )
}

type NavigationLinkButtonProps = {
  text: string
  linkTo: string
}

export function NavigationLinkButton({ text, linkTo }: NavigationLinkButtonProps) {
  return (
    <a
      href={linkTo}
      style={
        {
          "-webkit-text-stroke-color": "black",
          "-webkit-text-fill-color": "white",
          "-webkit-text-stroke-width": "1px",
        } as any
      }
      className="py-3 px-6 cursor-fancy tracking-wider text-center uppercase transition duration-200 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 shadow-lg select-none hover:bg-right-center active:transform active:scale-95 hover:scale-105"
      role="a">
      {text}
    </a>
  )
}
