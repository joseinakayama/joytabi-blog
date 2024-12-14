import { Suspense } from "react"
import { Metadata } from "next";
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import { blogPerPage } from "@/lib/utils"
import Blog from "@/components/blog/Blog"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import Loading from "@/app/loading"

export const revalidate = 0

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'ブログ一覧 | じょい旅 世界一周',
    description: 'じょい旅のブログの一覧を表示しています。'
  };
}


interface BlogPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

// ブログページ
const BlogPage = async ({ searchParams }: BlogPageProps) => {
const { page, perPage } = searchParams

const limit = typeof perPage === "string" ? parseInt(perPage) : blogPerPage
const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const allBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
    limit: limit,
    offset: offset,
      orders: "-publishedAt",
    },
  })

const pageCount = Math.ceil(allBlogs.totalCount / limit)

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
      <Blog blogs={allBlogs.contents} pageCount={pageCount} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default BlogPage
