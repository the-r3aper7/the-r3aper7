/* eslint-disable @next/next/no-img-element */
'use server';

import { getPost } from '../utils/markdownUtils';

type BlogHeroProps = {
  slug: string;
};

export async function BlogHero(props: BlogHeroProps) {
  const { slug } = props;
  const { description, image, publishedOn, title, tags } = await getPost(slug);
  return (
    <div className="relative mt-4">
      <img src={image} alt="" className="rounded object-cover" height={720} />
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-y-4 rounded backdrop-blur-lg">
        <h1 className="px-8 text-center text-6xl font-bold">{title}</h1>
        <div className="">
          <p className="text-center">{publishedOn}</p>
        </div>
      </div>
    </div>
  );
}
