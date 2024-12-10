export function MainNavigationMenu() {
  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-900 text-white h-full px-3">
      <div className="flex gap-3 items-center">
        <button
          className="py-3 px-6 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Home
        </button>
        <button
          className="py-3 px-6 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Combat
        </button>
        <button
          className="py-3 px-6 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Inventory
        </button>
        <button
          className="py-3 px-6 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Settings
        </button>
      </div>
      <div className="flex gap-3 items-center">
        <button
          className="py-3 px-6 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Save
        </button>
        <button
          className="py-3 px-6 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Load
        </button>
      </div>
    </div>
  )
}
