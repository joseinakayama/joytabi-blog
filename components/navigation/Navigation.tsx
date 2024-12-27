"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

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
      <div className="mx-auto max-w-screen-lg px-2 py-4 text-center md:text-left md:py-6">
        <Link href="/" className="relative inline-block w-40 h-16 md:w-48 md:h-20">
          <Image
            src="logo.svg"
            fill
            alt="じょい旅"
          />
        </Link>
      </div>

      <div className="bg-main-color">
        <div className="mx-auto max-w-screen-lg px-2">
          <div className="flex items-center justify-between text-sm font-bold">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "border-r border-l border-white py-3 text-center text-white w-full hover:bg-black",
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
