"use client";

import { useGetExchangeRatesLatest } from "@/api/hooks/useGetExchangeRatesLatest";
import Layout from "@/components/ui/layout";
import ExchangeRatesCard from "./components/exchangeRatesCard";
import MyWallet from "./components/myWallet";
import ExchangeBox from "./components/exchangeBox";
import { Skeleton } from "@/components/ui/skeleton";

export default function Main() {
  const { data: exchangeRatesLatestData, isLoading } =
    useGetExchangeRatesLatest();

  return (
    <Layout
      title="환율 정보"
      description="실시간 환율을 확인하고 간편하게 환전하세요."
    >
      <div className="flex flex-1 gap-6 ">
        <div className="flex flex-col flex-1 gap-6">
          {isLoading ? (
            <ExchanageRatesLatestListSkeleton />
          ) : (
            <div id="ExchangeRatesLatestList" className="flex space-x-5">
              {exchangeRatesLatestData &&
                exchangeRatesLatestData.data
                  .reverse()
                  .map((rate) => (
                    <ExchangeRatesCard key={rate.exchangeRateId} {...rate} />
                  ))}
            </div>
          )}
          <MyWallet />
        </div>
        <ExchangeBox exchangeRatesLatest={exchangeRatesLatestData?.data} />
      </div>
    </Layout>
  );
}

function ExchanageRatesLatestListSkeleton() {
  return (
    <div className="flex space-x-5">
      <Skeleton className="flex-1 h-[140px] w-12 rounded-[12px]" />
      <Skeleton className="flex-1 h-[140px] w-12 rounded-[12px]" />
    </div>
  );
}
