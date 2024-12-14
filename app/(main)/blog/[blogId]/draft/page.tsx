import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import BlogDetail from "@/components/blog/BlogDetail"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import "highlight.js/styles/github-dark.css"
import Loading from "@/app/loading"

export const dynamic = "force-dynamic";
export const revalidate = 0

export const metadata = {
  robots: "noindex",
};

interface BlogDetailPageProps {
  params: {
    blogId: string
  }
  searchParams: { [draftKey: string]: string | undefined };
}

export default async function DraftArticle({ params, searchParams }: BlogDetailPageProps) {
  const { blogId } = params;
  const { draftKey } = searchParams;

//blogIdとdraftKeyを用いて下書きの記事を取得
  const blog = await microcms.getListDetail({
    endpoint: "blog",
    contentId: blogId,
    queries: {
      draftKey,
    },
  });

  const relatedBlogsResponse = await microcms.getList<BlogType>({
      endpoint: "blog",
      queries: {
        filters: `category[equals]${blog.category.id}[and]id[not_equals]${blogId}`,
        limit: 6,
        orders: "-publishedAt",
      },
    })
    const relatedBlogs = relatedBlogsResponse.contents

  return (
    <Suspense fallback={<Loading />}>
      <LayoutWithSidebar>
        <div className="bg-destructive/10 p-6 mb-10">プレビュー中です。</div>
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
      </LayoutWithSidebar>
    </Suspense>
  );
}
