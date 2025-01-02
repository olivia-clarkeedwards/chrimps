import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectLoading, setLoading } from "../redux/metaSlice"

export default function Loading() {
  const loading = useAppSelector(selectLoading)
  console.log("in loading component")
  if (!loading) return null

  console.log("loading is true")
  return (
    <div className="fixed w-full h-full z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="text-6xl pl-[3ch] text-white">LOADING...</div>
    </div>
  )
}
