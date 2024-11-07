import type { Metadata, Viewport } from "next";
import { M_PLUS_1 } from "next/font/google"
import QueryProvider from "@/components/providers/QueryProvider"
import "./globals.css";

const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "じょい旅 世界一周ブログ",
    default: "じょい旅 世界一周ブログ",
  },
  description: '2025年1月から世界一周をしているアラサー夫婦。役に立つ情報を発信していきます。',
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

// ルートレイアウト
const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body className={mPlus1.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
