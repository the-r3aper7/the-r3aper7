import type { ImageProps } from '~/components/image/image';

interface ImageWithLinkProps extends ImageProps {
  href: string;
}

export const Tags: string[] = [
  'technology',
  'science',
  'success',
  'life',
  'wisdom',
  'inspirational',
  'friendship',
  'famous-qoutes',
];

export const Acquiring: ImageProps[] = [
  {
    name: 'TypeScript',
    src: '/logos/typescript.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-blue-400',
  },
  {
    name: 'JavaScript',
    src: '/logos/javascript.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-yellow-200',
  },
  {
    name: 'Python',
    src: '/logos/python.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-blue-100',
  },
  {
    name: 'React',
    src: '/logos/react.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-blue-500',
  },
  {
    name: 'Qwik',
    src: '/logos/qwik.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-purple-500',
  },
];

export const ContactMe: ImageWithLinkProps[] = [
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/in/sai-srikar-dumpeti',
    src: '/logos/linkedin.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-blue-300',
  },
  {
    name: 'GitLab',
    href: 'https://gitlab.com/the-r3aper7',
    src: '/logos/gitlab.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-orange-300',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/the-r3aper7',
    src: '/logos/github.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-white',
  },
  {
    name: 'Gmail',
    href: 'mailto:saisrikardumpeti@gmail.com',
    src: '/logos/gmail.png',
    class: 'md:h-14 h-10 rounded-lg shadow-md shadow-green-300',
  },
];
