"use client";

import { useGetWallets } from "@/api/hooks/useGetWallets";
import { useGetOrdersQuote } from "@/api/hooks/useGetOrdersQuote";
import {
  GetExchangeRatesLatestResponse,
  TCurrency,
} from "@/api/types/exchangeRates";
import FormInput from "@/components/forms/formInput";
import { Button } from "@/components/ui/button";
import GrayBoard from "@/components/ui/grayBoard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import debounce from "@/lib/debounce";
import { currencyFormat, formatComma, removeComma } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import React from "react";
import usePostOrders from "@/api/hooks/usePostOrders";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface exchangeFormValue {
  amount: number;
  exchangeResult: string;
}

const exchangeFormSchema = z.object({
  amount: z.number().min(1, "금액을 입력해 주세요."),
  exchangeResult: z.string(),
});

export default React.memo(function ExchangeBox({
  exchangeRatesLatest,
}: {
  exchangeRatesLatest: GetExchangeRatesLatestResponse[] | undefined;
}) {
  const queryClient = useQueryClient();
  const { data: walletsData } = useGetWallets();
  const enableExchangeCurrency =
    walletsData?.data.wallets.filter((w) => w.currency !== "KRW") ?? [];
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>("USD");
  const [exchangeMode, setExchangeMode] = useState<"buy" | "sell">("buy");

  const currentExchangeRateId = exchangeRatesLatest?.find(
    (er) => er.currency === selectedCurrency
  )?.exchangeRateId;
  const currentFromCurrency = exchangeMode === "buy" ? "KRW" : selectedCurrency;
  const currentToCurrency = exchangeMode === "buy" ? selectedCurrency : "KRW";

  const form = useForm<exchangeFormValue>({
    values: {
      amount: 0,
      exchangeResult: "0",
    },
    resolver: zodResolver(exchangeFormSchema),
  });
  const { watch, setValue } = form;
  const [debouncedAmount, setDebouncedAmount] = useState<number>(0);
  const amount = watch("amount");

  // 모든 사용자 입력에 따른 api요청 효율 향상을 위해 debounce처리
  const updateDebounced = useMemo(
    () =>
      debounce((value: number) => {
        setDebouncedAmount(value);
      }),
    []
  );

  useEffect(() => {
    updateDebounced(amount);
  }, [amount, updateDebounced]);

  // 매수,매도 금액 0원 일 떄 에러 코드 400응답으로 apiErrorHandler와 미스매칭됨에 따라 0원은 상태값만 처리.
  const { data: orderQuoteData } = useGetOrdersQuote({
    queryKey: [
      "orders",
      "quote",
      selectedCurrency,
      exchangeMode,
      debouncedAmount,
      exchangeRatesLatest, // 1분 주기 최신 환율 변경되어도 "적용 환율" 표시값 갱신
    ],
    from: currentFromCurrency,
    to: currentToCurrency,
    amount: debouncedAmount,
    enabled: debouncedAmount > 0,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = removeComma(e.target.value);
    if (/^\d*$/.test(raw)) {
      const num = !raw ? 0 : Number(raw);
      setValue("amount", num);
    }
  };

  // 매수,매도 금액이 0원 이상일 때만 fetch, 0원일 때 상태값 수동 변경
  useEffect(() => {
    if (debouncedAmount === 0) {
      setValue("exchangeResult", "0");
    }
  }, [debouncedAmount, setValue]);

  useEffect(() => {
    if (orderQuoteData?.data) {
      setValue("exchangeResult", formatComma(orderQuoteData?.data.krwAmount));
      // 최신 환율 ID Props 초기화
      queryClient.invalidateQueries({ queryKey: ["latestExchangeRates"] });
    }
  }, [setValue, orderQuoteData, queryClient]);

  const currencyExchangeMutation = usePostOrders({
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      toast.success("환전이 완료되었습니다.");
    },
    onError: (error) => {
      if (error.message === "지갑의 잔액이 부족합니다.") {
        form.setFocus("amount");
      }
    },
  });

  const onSumbitCurrencyExchange = (formData: exchangeFormValue) => {
    if (!currentExchangeRateId) return;
    currencyExchangeMutation.mutate({
      exchangeRateId: currentExchangeRateId,
      fromCurrency: currentFromCurrency,
      toCurrency: currentToCurrency,
      forexAmount: formData.amount,
    });
  };

  return (
    <GrayBoard className="flex-1">
      <Select
        value={selectedCurrency}
        onValueChange={(value) => setSelectedCurrency(value as TCurrency)}
      >
        <SelectTrigger
          className="border-none shadow-none px-0 mb-2"
          chvronSize="size-6"
        >
          <strong className="font-bold text-2xl">
            {currencyFormat(selectedCurrency).flag} {selectedCurrency} 환전하기
          </strong>
        </SelectTrigger>
        {enableExchangeCurrency && (
          <SelectContent>
            {enableExchangeCurrency?.map((cur) => (
              <SelectItem key={cur.currency} value={cur.currency}>
                {currencyFormat(cur.currency).flag}{" "}
                {`${currencyFormat(cur.currency).country} ${cur.currency}`}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
      <div
        id="tabs"
        className="flex bg-white border-[#D0D6DB] border rounded-2xl p-3 gap-3"
      >
        <Button
          onClick={() => setExchangeMode("buy")}
          variant={exchangeMode === "buy" ? "destructive" : "ghost"}
          className={`flex flex-1 text-xl h-[60px] rounded-xl ${
            exchangeMode !== "buy" && "text-destructive"
          }`}
        >
          살래요
        </Button>
        <Button
          onClick={() => setExchangeMode("sell")}
          variant={exchangeMode === "sell" ? "blue" : "ghost"}
          className={`flex flex-1 text-xl h-[60px] rounded-xl ${
            exchangeMode !== "sell" && "text-blue"
          }`}
        >
          팔래요
        </Button>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSumbitCurrencyExchange)}
          className="flex flex-col flex-1 justify-between"
        >
          <div className="flex flex-col gap-5 items-center">
            <FormInput
              id="amount"
              label={exchangeMode === "buy" ? "매수 금액" : "매도 금액"}
              placeholder="금액을 입력해주세요."
              inputClassName="text-right"
              unit={`${currencyFormat(selectedCurrency).money} ${
                exchangeMode === "buy" ? "사기" : "팔기"
              }`}
              value={formatComma(amount)}
              onChange={handleAmountChange}
            />
            <ChevronDown
              color="white"
              className="bg-gray-300 rounded-[1.2rem]"
            />
            <FormInput
              id="exchangeResult"
              label={exchangeMode === "buy" ? "필요 원화" : "환전 원화"}
              placeholder="금액을 입력해주세요."
              inputClassName="text-right"
              unit={`원 ${
                exchangeMode === "buy" ? "필요해요" : "받을 수 있어요"
              }`}
              unitClassName={
                exchangeMode === "buy" ? "text-destructive" : "text-blue"
              }
              readOnly
            />
          </div>
          <div className="mt-6 pt-6 border-t border-t-gray-400 space-y-8">
            <div className="flex justify-between">
              <span className="text-xl font-medium text-field-label">
                적용 환율
              </span>
              <span className="text-xl font-semibold text-field-label">
                1 {selectedCurrency} ={" "}
                {debouncedAmount === 0
                  ? 0
                  : formatComma(
                      orderQuoteData?.data.appliedRate ?? 0,
                      0,
                      2
                    )}{" "}
                원
              </span>
            </div>
            <Button
              type="submit"
              className={`w-full text-xl h-[60px] rounded-xl bg-sodomy`}
              disabled={amount === 0}
            >
              환전하기
            </Button>
          </div>
        </form>
      </FormProvider>
    </GrayBoard>
  );
});
