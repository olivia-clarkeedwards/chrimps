export function MainNavigationMenu() {
  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-900 text-white h-full">
      <div className="flex gap-2 items-center">
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Home
        </button>
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Combat
        </button>
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Inventory
        </button>
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Settings
        </button>
      </div>
      <div className="flex">
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Save
        </button>
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-tr from-red-500 via-orange-400 to-amber-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Load
        </button>
      </div>
    </div>
  )
}
