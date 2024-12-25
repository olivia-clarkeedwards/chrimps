import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { RootState } from "../../redux/store"

interface CurrencyProps {
  image: JSX.Element
  currencySelector: (state: RootState) => number
}

export default function Currency({ image, currencySelector }: CurrencyProps) {
  const currency = useAppSelector(currencySelector)

  return (
    <div className="flex absolute items-center gap-5 top-1/2 left-[57%] transform -translate-x-[57%] -translate-y-1/2">
      <div className="w-20 h-20">{image}</div>
      <span className="text-3xl text-white min-w-[9ch] text-left">{currency}</span>
    </div>
  )
}
