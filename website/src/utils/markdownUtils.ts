import { readdirSync } from 'fs';
import matter from 'gray-matter';

export type Frontmatter = {
  title: string;
  image: string;
  publishedOn: string;
  description: string;
  tags: string[];
  status: 'editing' | 'published';
};

export interface FileMetadata extends Frontmatter {
  uri: string;
}

const articleDirectory = 'app/articles';

export async function getPosts(): Promise<FileMetadata[]> {
  const files = readdirSync(articleDirectory)
    .filter((file) => file !== 'page.tsx')
    .map((file) => {
      const { data } = matter.read(`${articleDirectory}/${file}/page.mdx`);
      if ((data as Frontmatter).status !== 'published') {
        return undefined;
      }
      return {
        uri: `/articles/${file}`,
        ...(data as Frontmatter),
      };
    })
    .filter((post): post is FileMetadata => post !== undefined);

  return files;
}

export async function getPost(slug: string): Promise<FileMetadata> {
  try {
    const { data } = matter.read(`${articleDirectory}/${slug}/page.mdx`);

    return {
      ...(data as Frontmatter),
      uri: `articles/${slug}`,
    };
  } catch (e) {
    throw Error(`unable to parse post ${e}`);
  }
}
