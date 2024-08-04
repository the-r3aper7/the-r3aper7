import {
  FileMetadata,
  Frontmatter,
  getPost,
  getPosts,
} from "@/src/utils/markdownUtils";
import Image from "next/image";
import Link from "next/link";

export default async function Articles() {
  const files = await getPosts();

  return (
    <div className="min-h-screen space-y-8">
      {files.length > 0 ? (
        <h1 className="text-center">Coming soon</h1>
      ) : (
        <div className="grid grid-cols-4">
          {files.map((file) => {
            return <BlogItem {...file} key={file.uri} />;
          })}
        </div>
      )}
    </div>
  );
}

function BlogItem(props: FileMetadata) {
  const { description, image, publishedOn, uri, title } = props;
  return (
    <div className="w-[364px] bg-neutral-800 border border-gray-600 rounded p-4 group space-y-4">
      <Image
        src={image}
        alt=""
        width={256}
        height={512}
        className="object-fill max-h-72 w-full grayscale transition duration-300 group-hover:grayscale-0 rounded"
      />
      <Link href={uri} className="space-y-4 pt-4 block">
        <h3 className="font-medium text-3xl line-clamp-2 text-center">
          {title}
        </h3>
        <p className="text-base line-clamp-3 text-gray-400">{description}</p>
        <p className="text-center">{publishedOn}</p>
      </Link>
    </div>
  );
}
