import { useAppSelector } from "../../redux/hooks"
import { RootState } from "../../redux/store"

interface CurrencyProps {
  image: JSX.Element
  fontstyle: string
  currencySelector: (state: RootState) => number
  suffix?: string
}

export default function Currency({ image, fontstyle, currencySelector, suffix }: CurrencyProps) {
  const currency = useAppSelector(currencySelector)

  return (
    <div className="relative flex flex-none flex-col h-28 items-center">
      <div className="flex absolute items-center gap-3 top-1/2 left-[55%] md:left-[66%] transform -translate-x-[55%] md:-translate-x-[66%] -translate-y-1/2">
        <div className="w-20 h-20">{image}</div>
        <span className={`text-3xl min-w-[10ch] md:w-[15ch] text-left ${fontstyle}`}>
          {currency}
          {suffix}
        </span>
      </div>
    </div>
  )
}
