"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

const items = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "ABOUT",
    href: "/about",
  },
  {
    title: "RANKING",
    href: "/ranking",
  },
  {
    title: "BLOG",
    href: "/blog",
  },
]

// ナビゲーション
const Navigation = () => {
  const pathname = usePathname()

  return (
    <header>
      <div className="mx-auto max-w-screen-lg px-2 py-8">
        <Link href="/" className="font-bold text-xl">
          じょい旅
        </Link>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-screen-lg px-2">
          <div className="flex items-center justify-between text-sm font-bold">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "border-r border-l border-white py-3 text-center w-full hover:bg-black hover:text-white",
                  pathname === item.href && "bg-black text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
