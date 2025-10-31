import { GetExchangeRatesLatestResponse } from "@/api/types/exchangeRates";
import TriangleDown from "@/components/triangleDown";
import TriangleUp from "@/components/triangleUp";
import { currencyFormat, formatComma } from "@/lib/utils";

export default function ExchangeRatesCard({
  currency,
  rate,
  changePercentage,
}: GetExchangeRatesLatestResponse) {
  return (
    <div className="flex flex-1 flex-col px-8 py-6 border-[#D0D6DB] border rounded-[12px] space-y-2">
      <div className="flex justify-between">
        <span className="font-semibold text-field-label">{currency}</span>
        <span className="text-sm text-field-label">
          {currencyFormat(currency).country} {currencyFormat(currency).money}
        </span>
      </div>
      <div className="flex flex-col space-y-1">
        <strong className="text-2xl">{formatComma(rate, 0, 2)} KRW</strong>
        <div className="flex items-center gap-1">
          {changePercentage > 0 ? <TriangleUp /> : <TriangleDown />}
          <span
            className={`text-sm ${
              changePercentage > 0 ? "text-red-500" : "text-blue-500"
            }`}
          >
            {changePercentage > 0 && "+"}
            {`${changePercentage}`}%
          </span>
        </div>
      </div>
    </div>
  );
}
