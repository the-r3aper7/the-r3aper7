import createMDX from "@next/mdx"
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
    ]
  }
};

/** @type {import('rehype-pretty-code').Options}*/
const rehypePrettyCodeOptions = {
  theme: 'dark-plus'
}

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, rehypePrettyCodeOptions]],
    remarkPlugins: [remarkMath, remarkGfm, remarkFrontmatter],
  }
})

export default withMDX(nextConfig)