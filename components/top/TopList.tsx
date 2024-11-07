"use client"

import { useState } from "react"
import { BlogType } from "@/types"
import { cn } from "@/lib/utils"
import BlogItem from "@/components/blog/BlogItem"

interface TopListProps {
  latestBlogs: BlogType[]
  recommendedBlogs: BlogType[]
  specialBlogs: BlogType[]
}

// トップページの記事一覧
const TopList = ({
  latestBlogs,
  recommendedBlogs,
  specialBlogs,
}: TopListProps) => {
  const [filter, setFilter] = useState("新着")

  // 選択したフィルターに基づいて表示する記事を決定
  const filteredBlogs = (() => {
    switch (filter) {
      case "新着":
        return latestBlogs
      case "オススメ":
        return recommendedBlogs
      case "特集":
        return specialBlogs
      default:
        return latestBlogs
    }
  })()

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border text-sm font-bold">
        <button
          className={cn(
            "border-r py-3 text-center w-full hover:bg-black hover:text-white",
            filter === "新着" && "bg-black text-white"
          )}
          onClick={() => setFilter("新着")}
        >
          新着記事
        </button>
        <button
          className={cn(
            "border-r py-3 text-center w-full hover:bg-black hover:text-white",
            filter === "オススメ" && "bg-black text-white"
          )}
          onClick={() => setFilter("オススメ")}
        >
          オススメ
        </button>
        <button
          className={cn(
            "py-3 text-center w-full hover:bg-black hover:text-white",
            filter === "特集" && "bg-black text-white"
          )}
          onClick={() => setFilter("特集")}
        >
          特集記事
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBlogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default TopList
