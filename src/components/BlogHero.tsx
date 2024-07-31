/* eslint-disable @next/next/no-img-element */
'use server'

import { getPost } from "../utils/markdownUtils"

type BlogHeroProps = {
  slug: string
}

export async function BlogHero(props: BlogHeroProps) {
  const { slug } = props
  const { description, image, publishedOn, title, tags } = await getPost(slug)
  return (
    <div className="relative mt-4">
      <img src={image} alt="" className="rounded" />
      <div className="absolute top-0 flex flex-col gap-y-4 justify-center items-center w-full h-full backdrop-blur-lg rounded">
        <h1 className=" text-6xl font-bold text-center">{title}</h1>
        <div className="">
          <p className="text-center">{publishedOn}</p>
        </div>
      </div>
    </div>
  )
}