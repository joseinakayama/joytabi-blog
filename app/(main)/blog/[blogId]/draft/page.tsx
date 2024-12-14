import { Suspense } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import BlogDetail from "@/components/blog/BlogDetail"
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar"
import hljs from "highlight.js"
import * as cheerio from "cheerio"
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

  if (blog?.content) {
    const $ = cheerio.load(blog.content)

    $("pre").each((_, element) => {
      const parent = $(element).parent()
      const filename = parent.attr("data-filename")
      parent.addClass("my-5")

      $(element)
        .find("code")
        .each((_, codeElement) => {
          const codeText = $(codeElement).text()

          const className = $(codeElement).attr("class") || ""
          const languageMatch = className.match(/language-(\w+)/)
          const language = languageMatch ? languageMatch[1] : "plaintext"

          try {
            const result = hljs.highlight(codeText, { language })
            $(codeElement).html(result.value)
            $(codeElement).addClass("hljs")
          } catch (highlightError) {
            console.error("Highlight.js error:", highlightError)
            $(codeElement).text(codeText)
          }
        })

      if (filename) {
        $(element).before(
          `<div class="bg-[#0D1117] text-white py-1 px-3 text-sm inline-block">${filename}</div>`
        )
      }
    })
    $("code").each((_, element) => {
      $(element).addClass("bg-gray-100 py-1 px-2 text-sm")
    })
    $("p").each((_, element) => {
      $(element).addClass("my-5")
    })
    $("h2").each((_, element) => {
      $(element).addClass("text-3xl font-bold my-7 p-3 c-h2")
    })
    $("h3").each((_, element) => {
      $(element).addClass("text-2xl font-bold my-7 pl-3 border-blue-100 border-solid border-l-4")
    })
    $("h4").each((_, element) => {
      $(element).addClass("text-xl font-bold my-6")
    })
    $("h5").each((_, element) => {
      $(element).addClass("text-lg font-bold my-5")
    })
    $("h6").each((_, element) => {
      $(element).addClass("text-md font-bold my-5")
    })
    $("ul").each((_, element) => {
      $(element).addClass("list-disc ml-5 my-5")
    })
    $("ol").each((_, element) => {
      $(element).addClass("list-decimal ml-5 my-5")
    })
    $("blockquote").each((_, element) => {
      $(element).addClass("border-l-4 pl-4 italic my-5")
    })
    $("table").each((_, element) => {
      $(element).addClass("table-auto border-collapse border my-5")
    })
    $("th").each((_, element) => {
      $(element).addClass("border px-4 py-1 bg-gray-50")
    })
    $("th p").each((_, element) => {
      $(element).removeClass("my-5")
      $(element).addClass("my-0")
    })
    $("td").each((_, element) => {
      $(element).addClass("border px-4 py-1")
    })
    $("td p").each((_, element) => {
      $(element).removeClass("my-5")
      $(element).addClass("my-0")
    })
    $("a").each((_, element) => {
      $(element).addClass("text-blue-500 underline")
    })
    $("img").each((_, element) => {
      $(element).addClass("my-5")
    })
    $("hr").each((_, element) => {
      $(element).addClass("my-5")
    })

    // パース後のHTMLを更新
    blog.content = $.html()
  }

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
