"use client";

import FormInput from "@/components/forms/formInput";
import { Button } from "@/components/ui/button";
import GrayBoard from "@/components/ui/grayBoard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/list/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/auth";
import { useEffect } from "react";

interface loginFormValue {
  email: string;
}

const loginFormSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해 주세요."),
});

export default function Login() {
  const router = useRouter();
  const form = useForm<loginFormValue>({
    values: {
      email: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    form.setFocus("email");
  }, [form]);

  const userLogin = useMutation({
    mutationFn: (email: string) => authApi.login({ email }),
    onSuccess: (res) => {
      setAuthToken(res.data.token);
      toast.success("로그인에 성공했습니다");
      router.push("/");
    },
  });

  const onSubmit = (data: loginFormValue) => {
    userLogin.mutate(data.email);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center ">
      <div className="flex flex-col items-center w-[560px] space-y-10">
        <div className="flex flex-col text-center space-y-2">
          <strong className="text-5xl">반갑습니다.</strong>
          <p className="text-3xl text-gray-600">로그인 정보를 입력해주세요.</p>
        </div>
        <GrayBoard>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                id="email"
                label="이메일 주소를 입력해주세요."
                placeholder="이메일 주소 입력"
              />
              <Button type="submit" size={"lg"} className="w-full mt-6">
                로그인 하기
              </Button>
            </form>
          </FormProvider>
        </GrayBoard>
      </div>
    </div>
  );
}
