"use client"

import { BlogType } from "@/types"
import BlogItem from "@/components/blog/BlogItem"

interface RankingProps {
  blogs: BlogType[]
}

// ランキング
const Ranking = ({ blogs }: RankingProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} isRanking />
        ))}
      </div>
    </div>
  )
}

export default Ranking
