export function MainNavigationMenu() {
  return (
    <div className="flex flex-wrap justify-between bg-gray-800 text-white p-4 h-full">
      <div className="flex">
        <div className="p-2">Home</div>
        <div className="p-2">Combat</div>
        <div className="p-2">Inventory</div>
        <div className="p-2">Settings</div>
      </div>
      <div className="flex">
        <div className="p-2">Save</div>
        <div className="p-2">Load</div>
      </div>
    </div>
  )
}
