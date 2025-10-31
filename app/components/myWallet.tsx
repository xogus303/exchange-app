import { useGetWallets } from "@/api/hooks/useGetWallets";
import GrayBoard from "@/components/ui/grayBoard";
import { Skeleton } from "@/components/ui/skeleton";
import { currencyFormat, formatComma } from "@/lib/utils";
import React from "react";

export default React.memo(function MyWallet() {
  const { data, isLoading } = useGetWallets();

  if (isLoading) return <MyWalletsSkeleton />;
  return (
    <GrayBoard className="flex-1">
      <div className="flex flex-1 flex-col gap-4">
        <strong className="text-2xl">내 지갑</strong>
        <ul className="flex flex-col gap-2">
          {data?.data.wallets.map((wallet) => (
            <li key={wallet.walletId} className="flex justify-between">
              <span className="font-medium text-field-label text-xl">
                {wallet.currency}
              </span>
              <span className="font-semibold text-field-label text-xl">
                {currencyFormat(wallet.currency).symbol}{" "}
                {formatComma(wallet.balance)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between border-t border-t-gray-400 pt-6">
        <span className="text-xl font-medium text-field-label">
          총 보유 자산
        </span>
        <strong className="text-xl font-bold text-blue">
          {currencyFormat("KRW").symbol}{" "}
          {formatComma(data?.data?.totalKrwBalance || 0)}
        </strong>
      </div>
    </GrayBoard>
  );
});

function MyWalletsSkeleton() {
  return <Skeleton className="flex-1 rounded-[12px]" />;
}
