import { FileMetadata, getPosts } from '@/src/utils/markdownUtils';
import Image from 'next/image';
import Link from 'next/link';

export default async function Articles() {
  const files = await getPosts();

  return (
    <div className="min-h-screen space-y-8">
      {files.length === 0 ? (
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
    <div className="group w-[364px] space-y-4 rounded border border-gray-600 bg-neutral-800 p-4">
      <Image
        src={image}
        alt=""
        width={256}
        height={512}
        className="max-h-72 w-full rounded object-fill grayscale transition duration-300 group-hover:grayscale-0"
      />
      <Link href={uri} className="block space-y-4 pt-4">
        <h3 className="line-clamp-2 text-center text-3xl font-medium">
          {title}
        </h3>
        <p className="line-clamp-3 text-base text-gray-400">{description}</p>
        <p className="text-center">{publishedOn}</p>
      </Link>
    </div>
  );
}
