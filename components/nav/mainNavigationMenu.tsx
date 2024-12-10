export function MainNavigationMenu() {
  return (
    <div className="flex flex-wrap justify-between bg-gray-900 text-white p-4 h-full">
      <div className="flex gap-2">
        <button
          className="m-2 py-4 px-8 text-center uppercase transition duration-500 bg-gradient-to-r from-red-500 via-orange-400 to-red-500 text-white rounded-lg block border-0 font-bold shadow-lg cursor-pointer select-none hover:bg-right-center active:transform active:scale-95"
          role="button">
          Button 87
        </button>
        <button className="py-2 px-4 rounded-xl hover:shadow-slate-600/70 hover:shadow-lg">Home</button>
        <button className="py-2 px-4 rounded-xl hover:shadow-slate-600/70 hover:shadow-lg">Combat</button>
        <button className="py-2 px-4 rounded-xl hover:shadow-slate-600/70 hover:shadow-lg">Inventory</button>
        <button className="py-2 px-4 rounded-xl hover:shadow-slate-600/70 hover:shadow-lg">Settings</button>
      </div>
      <div className="flex">
        <button className="py-2 px-4 rounded-xl hover:shadow-slate-600/70 hover:shadow-lg">Save</button>
        <button className="py-2 px-4 rounded-xl hover:shadow-slate-600/70 hover:shadow-lg">Load</button>
      </div>
    </div>
  )
}
