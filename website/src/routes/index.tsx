import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import Image from '~/components/image/image';
import { BookIcon } from '~/icons/books';
import { ContactsIcon } from '~/icons/contacts';
import { LearningIcon } from '~/icons/learning';
import { randomTag } from '~/utils/randRange';
import { Acquiring, ContactMe } from '../utils/constants';
import { getLoginURL } from './api/auth/google/get-google-auth-url.util';

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

export const useGetQoute = routeLoader$(async () => {
  const qoutableUrl = new URL('https://api.quotable.io/');
  const tag = randomTag() as string;

  qoutableUrl.pathname = 'random';
  qoutableUrl.searchParams.append('maxLength', '70');
  qoutableUrl.searchParams.append('tags', tag);

  const abortController = new AbortController();

  const request = await fetch(qoutableUrl, { signal: abortController.signal });

  if (request.status !== 200) {
    abortController.abort();
    return defaultQuote;
  }

  const response: QouteAbleResponse = await request.json();

  abortController.abort();

  if (response.author.trim() === '') {
    return defaultQuote;
  }

  return {
    author: response.author,
    content: response.content,
  };
});

export default component$(() => {
  const qoute = useGetQoute().value as getQouteData;
  const loginURL = useSignal<string>('');
  useTask$(async () => {
    loginURL.value = await getLoginURL();
  });
  return (
    <>
      <a href={loginURL.value}>Google Auth</a>
      <section class='flex md:flex-row flex-col min-h-screen justify-center items-center text-gray-200 md:gap-x-4 md:px-4 gap-y-2'>
        <article class='flex flex-col justify-center items-center w-3/4 md:w-1/2 md:gap-x-2 gap-y-2 p-4'>
          <h1 class='md:text-3xl text-2xl text-center items-center md:max-w-fit max-w-xs'>
            {qoute.content}
            <span class='block text-sm md:text-base italic'> - {qoute.author}</span>
          </h1>
          <div class='p-2 aspect-square lg:h-64 md:h-60 h-52'>
            <Image
              name='Sai Srikar Dumpeti'
              src='images/me.jpg'
              class='rounded-full object-contain shadow-md shadow-orange-300 brightness-105'
            />
          </div>
          <h1 class='md:text-3xl text-xl text-center'>Sai Srikar Dumpeti</h1>
        </article>

        <div class='md:w-0.5 md:h-96 w-72 h-0.5 md:bg-gradient-to-b bg-gradient-to-r from-transparent via-white to-transparent md:mx-4'>
          {''}
        </div>

        <article class='flex flex-col items-center justify-center w-3/4 md:w-1/2 flex-wrap gap-y-4'>
          <div class='flex flex-col items-center space-y-2'>
            <h1 class='md:text-3xl text-xl text-center'>
              <span class={'inline-block'}>
                <LearningIcon height={42} width={42} strokeWidth={1} />
              </span>
              Currently Learning
            </h1>
            <div class='flex flex-wrap justify-center gap-3 md:max-w-md group'>
              <a href='https://www.rust-lang.org/' target='_blank' referrerPolicy='no-referrer'>
                <Image
                  name='Rust'
                  src='/logos/rust.png'
                  class='md:h-20 h-14 rounded-lg md:shadow-lg shadow-md shadow-amber-700'
                />
              </a>
            </div>
          </div>
          <div class='flex flex-col items-center md:gap-x-2 gap-y-2 p-2'>
            <h1 class='md:text-3xl text-xl text-center'>
              <span class={'inline-block'}>
                <ContactsIcon height={42} width={42} strokeWidth={1} />
              </span>
              Contact Me
            </h1>
            <div class='flex flex-wrap justify-center gap-3 md:max-w-md group'>
              {ContactMe.map((props, index) => {
                return (
                  <a
                    key={`${index}-${props.name}`}
                    target='_blank'
                    referrerPolicy='no-referrer'
                    {...props}
                  >
                    <Image {...props} />
                  </a>
                );
              })}
            </div>
          </div>
          <div class='flex flex-col h-12 items-center md:space-x-2 space-y-2 p-2'>
            <h1 class='md:text-3xl text-lg text-center'>
              <span class={'inline-block'}>
                <BookIcon height={42} width={42} strokeWidth={1} />
              </span>
              Learning Through Open Source
            </h1>
            <div class='flex flex-wrap justify-center gap-3 md:max-w-md'>
              {Acquiring.map((props, index) => {
                return (
                  <a
                    key={`${index}-${props.name}`}
                    target='_blank'
                    referrerPolicy='no-referrer'
                    {...props}
                  >
                    <Image {...props} />
                  </a>
                );
              })}
            </div>
          </div>
        </article>
      </section>
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
