import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const skills = [
  {
    id: 'my-skills-1',
    name: 'Python',
    lang: 'python',
    description: 'Experience in creating REST APIs and mine data using requests.'
  },
  {
    id: 'my-skills-2',
    name: 'HTML5',
    lang: 'html',
    description: 'Experience in creating basic site structures.'
  },
  {
    id: 'my-skills-3',
    name: 'CSS3',
    lang: 'css',
    description: 'Experience in making websites beautiful.'
  },
  {
    id: 'my-skills-4',
    name: 'JavaScript',
    lang: 'javascript',
    description:
      'Experience in giving functionality to website, used usually in React.js and other frameworks.'
  },
  {
    id: 'my-skills-5',
    name: 'Go',
    lang: 'go',
    description: 'Basic understanding of language like concurrency and created a project.',
  },
  {
    id: 'my-skills-6',
    name: 'React.js',
    lang: 'react',
    description: 'Created some websites using this framework.'
  },
  {
    id: 'my-skills-7',
    name: 'Kotlin',
    lang: 'kotlin',
    description: "created apps in android using kotlin"
  }
];

export function Hero() {
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center gap-y-10" id="me">
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
            <p>and Programming <span>👨🏻‍💻</span></p>
          </div>
        </div>
        <Link
          href="https://github.com/the-r3aper7"
          className="hover:bg-gray-900 border-2 border-gray-600 p-3 flex items-center gap-x-2 transition duration-300"
        >
          Checkout my projects <IconArrowUpRight size={22} />
        </Link>
      </section>
      <section className="min-h-screen flex flex-col items-center gap-y-10" id="skills">
        <h1 className="text-5xl font-bold text-center">My Skills</h1>
        <Skills />
      </section>
    </>
  );
}

function Skills() {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {
        skills.map((skill) => {
          return (
            <div className="h-96 w-[318px] bg-neutral-800 border border-gray-600 rounded px-4 space-y-4 pt-44 group" key={skill.id}>
              <Image
                src={`/logos/${skill.lang}.png`}
                alt={skill.lang}
                width={44}
                height={44}
                className="object-contain h-12 grayscale transition duration-300 group-hover:grayscale-0"
              />
              <p className="font-medium text-xl inline-flex justify-between items-center w-full">
                {skill.name}
                <a href={`https://github.com/the-r3aper7?tab=repositories&language=${skill.lang}`}
                ><IconArrowUpRight size={22} /></a
                >
              </p>
              <p className="text-base line-clamp-3">{skill.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}