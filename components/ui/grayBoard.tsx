import { cn } from "@/lib/utils";

export default function GrayBoard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col py-6 px-8 w-full border border-gray-300 rounded-2xl bg-gray-50 space-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}
