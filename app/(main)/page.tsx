import { Suspense } from "react"
import { Metadata } from "next";
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import Top from "@/components/top/Top"
import TopList from "@/components/top/TopList"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import Loading from "@/app/loading"

export const revalidate = 0

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'じょい旅 世界一周',
    description: 'じょい旅 世界一周は世界一周についての情報を発信するサイトです。'
  };
}


// メインページ
const HomePage = async () => {
  // 非同期で複数のデータを同時に取得
  const [latestBlogs, recommendedBlogs, specialBlogs] = await Promise.all([
    // 最新のブログ記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        orders: "-publishedAt",
        limit: 10,
      },
    }),
    

    // オススメ記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: "isRecommended[equals]true",
      },
    }),

    // 特集記事を取得
    microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: "isSpecial[equals]true",
      },
    }),
  ])
  

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-10 mb-10">
        <Top blogs={recommendedBlogs.contents} />
        <LayoutWithSidebar>
         <TopList
           latestBlogs={latestBlogs.contents}
           recommendedBlogs={recommendedBlogs.contents}
           specialBlogs={specialBlogs.contents}
         />
       </LayoutWithSidebar>
      </div>
    </Suspense>
  )
}

export default HomePage
