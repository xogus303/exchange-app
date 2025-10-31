"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/logout";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const goToMain = useCallback(() => {
    router.push("/");
  }, [router]);

  const goToDetails = useCallback(() => {
    router.push("/details");
  }, [router]);

  if (pathname === "/login") return null;

  return (
    <header className="flex w-full justify-between items-center px-10 py-4 border-b border-gray-300">
      <div>
        <strong>Exchange app</strong>
      </div>
      <div className="flex items-center gap-4">
        <nav>
          <Button
            variant={"ghost"}
            onClick={goToMain}
            className={`text-xl font-stretch-semi-condensed ${
              pathname !== "/" && "text-placeholder"
            }`}
          >
            환전 하기
          </Button>
          <Button
            variant={"ghost"}
            onClick={goToDetails}
            className={`text-xl font-stretch-semi-condensed ${
              pathname !== "/details" && "text-placeholder"
            }`}
          >
            환전 내역
          </Button>
        </nav>
        <Button
          variant={"blue"}
          onClick={logout}
          className="text-xl font-stretch-semi-condensed"
        >
          Log out
        </Button>
      </div>
    </header>
  );
}
