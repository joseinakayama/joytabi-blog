import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import Ranking from "@/components/ranking/Ranking"
import Loading from "@/app/loading"

export const revalidate = 0

// ランキングページ
const RankingPage = async () => {
  // MicroCMSからランキング順のブログを取得
  const rankingBlogs = await microcms.getList<BlogType>({
    endpoint: "blog",
    queries: {
      filters: "ranking[exists]", // ランキングが設定されているものだけを取得
      orders: "ranking", // ランキングの数値順に並べる
    },
  })

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <Ranking blogs={rankingBlogs.contents} />
      </LayoutWithSidebar>
    </Suspense>
  )
}

export default RankingPage
