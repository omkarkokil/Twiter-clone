"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="383625496778-qm34fmrbdtf08i78mn1qv960cb8urcvc.apps.googleusercontent.com">
          <body className={inter.className}>
            <Toaster />
            <ReactQueryDevtools />
            {children}
          </body>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </html>
  );
}
