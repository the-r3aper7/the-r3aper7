import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { BookIcon } from '~/icons/books';
import { ContactsIcon } from '~/icons/contacts';
import { LearningIcon } from '~/icons/learning';
import { randomTag } from '~/utils/randRange';
import { Acquiring, ContactMe } from '../utils/constants';
import {Image} from "qwik-image"
import Hero from '~/components/hero';

export interface QouteAbleResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export type getQouteData = {
  author: string;
  content: string;
};

export const defaultQuote = {
  author: 'John Wick Universe',
  content: 'Rules... without them we live with the animals.',
};

// export const useGetQoute = routeLoader$(async () => {
//   const qoutableUrl = new URL('https://api.quotable.io/');
//   const tag = randomTag() as string;

//   qoutableUrl.pathname = 'random';
//   qoutableUrl.searchParams.append('maxLength', '70');
//   qoutableUrl.searchParams.append('tags', tag);

//   const abortController = new AbortController();

//   const request = await fetch(qoutableUrl, { signal: abortController.signal });

//   if (request.status !== 200) {
//     abortController.abort();
//     return defaultQuote;
//   }

//   const response: QouteAbleResponse = await request.json();

//   abortController.abort();

//   if (response.author.trim() === '') {
//     return defaultQuote;
//   }

//   return {
//     author: response.author,
//     content: response.content,
//   };
// });

export default component$(() => {
  // const qoute = useGetQoute().value as getQouteData;

  return (
    <>
      <div class="m-12">
        <Hero />
      </div>
      <div class="m-12">
        <Hero />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Sai Srikar Dumpeti',
  meta: [
    {
      name: 'description',
      content: 'Personal Website of Sai Srikar Dumpeti',
    },
    { property: 'og:title', content: 'Sai Srikar Dumpeti' },
    {
      property: 'og:image',
      content: 'https://images.pexels.com/photos/15843151/pexels-photo-15843151.jpeg?w=640&h=427',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://ssd7.verce.app/',
    },
  ],
};
