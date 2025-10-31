import "./globals.css";
import Header from "./header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="flex w-full h-full">
      <body className="flex flex-1 flex-col">
        <ReactQueryProvider>
          <Header />
          <main className="flex flex-1">{children}</main>
        </ReactQueryProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
