import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastNotifications } from "@/components/notifications/toast-notifications"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ET & WICCA - Sistema de Gestão de TI",
  description: "Sistema interno de gestão de tecnologia da ET & WICCA",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <ToastNotifications />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
