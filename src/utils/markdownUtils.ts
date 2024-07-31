import matter, { read } from "gray-matter"
import { readdirSync } from 'fs';

export type Frontmatter = {
  title: string;
  image: string;
  publishedOn: string;
  description: string;
  tags: string[]
};

export interface FileMetadata extends Frontmatter {
  uri: string;
}

const articleDirectory = "app/articles"

export async function getPosts(): Promise<FileMetadata[]> {
  const files = readdirSync(articleDirectory)
  .filter((file) => file !== "page.tsx")
  .map((file) => {
    const { data } = matter.read(`${articleDirectory}/${file}/page.mdx`)
    return {
      uri: `/articles/${file}`,
      ...data as Frontmatter
    }
  })
  return files;
}

export async function getPost(slug: string): Promise<FileMetadata> {
  try {
    const {data} = matter.read(`${articleDirectory}/${slug}/page.mdx`)

    return {
      ...data as Frontmatter,
      uri: `articles/${slug}`
    };
  } catch (e) {
    throw Error(`unable to parse post ${e}`);
  } 
}
