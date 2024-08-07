import { IconArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const skills = [
  {
    id: 'my-skills-1',
    name: 'Python',
    lang: 'python',
    description:
      'Experience in creating REST APIs and mine data using requests.',
  },
  {
    id: 'my-skills-2',
    name: 'HTML5',
    lang: 'html',
    description: 'Experience in creating basic site structures.',
  },
  {
    id: 'my-skills-3',
    name: 'CSS3',
    lang: 'css',
    description: 'Experience in making websites beautiful.',
  },
  {
    id: 'my-skills-4',
    name: 'JavaScript',
    lang: 'javascript',
    description:
      'Experience in giving functionality to website, used usually in React.js and other frameworks.',
  },
  {
    id: 'my-skills-5',
    name: 'Go',
    lang: 'go',
    description:
      'Basic understanding of language like concurrency and created a project.',
  },
  {
    id: 'my-skills-6',
    name: 'React.js',
    lang: 'react',
    description: 'Created some websites using this framework.',
  },
  {
    id: 'my-skills-7',
    name: 'Kotlin',
    lang: 'kotlin',
    description: 'created apps in android using kotlin',
  },
];

export function Hero() {
  return (
    <>
      <section
        className="flex min-h-screen flex-col items-center justify-center gap-y-10"
        id="me"
      >
        <Image
          src="https://github.com/the-r3aper7.png"
          width={256}
          height={256}
          className="rounded-full"
          alt="Sai Srikar Dumpeti"
        />
        <div className="space-y-8 text-center">
          <h1 className="text-5xl">Hi, I&apos;m Sai Srikar Dumpeti 👋🏻</h1>
          <div className="text-4xl font-medium">
            <p>Exploring OSS</p>
            <p>Love Playing Games</p>
            <p>
              and Programming <span>👨🏻‍💻</span>
            </p>
          </div>
        </div>
        <Link
          href="https://github.com/the-r3aper7"
          className="flex items-center gap-x-2 border-2 border-gray-600 p-3 transition duration-300 hover:bg-gray-900"
        >
          Checkout my projects <IconArrowUpRight size={22} />
        </Link>
      </section>
      <section
        className="flex min-h-screen flex-col items-center gap-y-10"
        id="skills"
      >
        <h1 className="text-center text-5xl font-bold">My Skills</h1>
        <Skills />
      </section>
    </>
  );
}

function Skills() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skills.map((skill) => {
        return (
          <div
            className="group h-96 w-[318px] space-y-4 rounded border border-gray-600 bg-neutral-800 px-4 pt-44"
            key={skill.id}
          >
            <Image
              src={`/logos/${skill.lang}.png`}
              alt={skill.lang}
              width={44}
              height={44}
              className="h-12 object-contain grayscale transition duration-300 group-hover:grayscale-0"
            />
            <p className="inline-flex w-full items-center justify-between text-xl font-medium">
              {skill.name}
              <a
                href={`https://github.com/the-r3aper7?tab=repositories&language=${skill.lang}`}
              >
                <IconArrowUpRight size={22} />
              </a>
            </p>
            <p className="line-clamp-3 text-base">{skill.description}</p>
          </div>
        );
      })}
    </div>
  );
}
