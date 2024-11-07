"use client"

import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { format } from "date-fns"
import { BlogType } from "@/types"
import Image from "next/image"
import Link from "next/link"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface TopProps {
  blogs: BlogType[]
}

// トップ
const Top = ({ blogs }: TopProps) => {
  const slideSettings = {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className="max-w-full"
    >
      {blogs.map((blog) => {
        const categoryColor = blog.category.color || "gray"

        return (
          <SwiperSlide key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <div className="aspect-video relative overflow-hidden group max-h-[600px]">
                <Image
                  src={blog.image.url}
                  fill
                  alt="post"
                  className="object-cover transition-transform duration-100 ease-in-out group-hover:scale-105"
                  priority={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-10 left-0 right-0 bg-black/40 mx-10 pt-5">
                  <div className="text-white p-5 text-xs md:text-sm space-y-2">
                    <div>{format(new Date(blog.createdAt), "yyy/MM/dd")}</div>
                    <div>{blog.title}</div>
                  </div>

                  <div
                    className="absolute top-0 left-0 text-xs text-white py-1.5 px-4"
                    style={{ backgroundColor: categoryColor }}
                  >
                    {blog.category.name}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default Top
