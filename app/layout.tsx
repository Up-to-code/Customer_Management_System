import type React from "react"
import type { Metadata } from "next"
import { cairo } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "نظام إدارة علاقات العملاء لمتجر الأحذية",
  description: "تطبيق لإدارة علاقات العملاء لمتجر الأحذية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  )
}



import './globals.css'