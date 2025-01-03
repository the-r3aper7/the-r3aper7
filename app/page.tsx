import {
  Blocks,
  Code,
  Coffee,
  FileText,
  FolderKanban,
  Gamepad,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBrandLeetcode, IconGitMerge } from "@tabler/icons-react";
import { Project, TechInfo, TechName } from "@/lib/types/others";
import {
  OpenSourceOrganization,
  projects,
  techIcons,
  techStacks,
} from "@/lib/constant";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl mx-auto mt-4 p-8 w-full">
            <Hero />
          </div>
        </div>
        <div className="w-full">
          <Contact />
        </div>
      </main>
      <main
        className="min-h-screen flex-1 flex items-center justify-center"
        id="projects"
      >
        <div className="max-w-2xl mx-auto mt-4 p-8 w-full">
          <Projects />
        </div>
      </main>
      <main
        className="min-h-screen flex-1 flex items-center justify-center"
        id="open-source-contributions"
      >
        <div className="max-w-2xl mx-auto mt-4 p-8 w-full">
          <OpenSourceContributions />
        </div>
      </main>
      <main
        className="min-h-screen flex-1 flex items-center justify-center"
        id="my-tech-stack"
      >
        <div className="max-w-2xl mx-auto mt-4 p-8 w-full">
          <MyStack />
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <>
      <h1 className="text-4xl font-bold">
        Hello, Visitor 👋
      </h1>
      <p className="pt-6">
        I&apos;m Sai Srikar Dumpeti, a student, developer, and gamer from
        🇮🇳.<br />
        Currently working at{" "}
        <a
          href="https://www.qolaba.ai/"
          target="_blank"
          referrerPolicy="no-referrer"
          className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
        >
          Qolaba.ai
        </a>{" "}
        as a Backend Intern.
      </p>
      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-4">
          What I&apos;m all about:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Code className="w-5 h-5 text-blue-500" />
            <span>
              Building meaningful{" "}
              <Link
                href={"#projects"}
                className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
              >
                projects
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Coffee className="w-5 h-5 text-blue-500" />
            <span>Learning new technologies</span>
          </div>
          <div className="flex items-center space-x-3">
            <Gamepad className="w-5 h-5 text-blue-500" />
            <span>Gaming in free time</span>
          </div>
          <div className="flex items-center space-x-3">
            <Github className="w-5 h-5 text-blue-500" />
            <span>
              Open Source
              <Link
                href="#open-source-contributions"
                className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
              >
                {" "}Contributions
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>
              View my{" "}
              <Link
                href={"/files/resume.pdf"}
                className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
              >
                resume
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Blocks className="w-5 h-5 text-blue-500 mr-2" />
            <span>
              Checkout{" "}
              <Link
                href="#my-tech-stack"
                className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
              >
                my tech stack
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-around sm:gap-x-8 p-4 sm:p-8">
        <Link
          href="https://www.linkedin.com/in/sai-srikar-dumpeti/"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <Button variant="ghost">
            <Linkedin className="w-5 h-5 text-blue-500" />
            <span className="hidden sm:inline ml-2">@sai-srikar-dumpeti</span>
          </Button>
        </Link>
        <Link
          href="https://www.github.com/the-r3aper7/"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <Button variant="ghost">
            <Github className="w-5 h-5 text-blue-500" />
            <span className="hidden sm:inline ml-2">@the-r3aper7</span>
          </Button>
        </Link>
        <Link
          href="https://leetcode.com/u/the-r3aper7/"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <Button variant="ghost">
            <IconBrandLeetcode className="w-6 h-6 text-blue-500" />
            <span className="hidden sm:inline ml-2">@the-r3aper7</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

const OpenSourceContributions = () => {
  return (
    <>
      <h1 className="text-3xl font-bold flex items-center justify-center mb-16">
        <IconGitMerge className="w-10 h-10 text-blue-500 mr-2" />
        Contributions to open source
      </h1>
      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
        {OpenSourceOrganization.map((source) => {
          return (
            <Link href={source.url} key={source.id}>
              <div className="h-32 w-32 border border-transparent rounded-lg flex flex-col items-center justify-around hover:border-gray-700 hover:bg-white/5 transition-all duration-300">
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        src={source.image}
                        alt={source.name}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    </TooltipTrigger>
                    <TooltipContent side={"bottom"}>
                      <p>{source.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

const ProjectBadge: React.FC<{ techName: TechName }> = ({ techName }) => {
  const tech = techIcons[techName];

  return (
    <Badge variant="secondary">
      <Image
        src={tech.icon_url}
        alt={tech.label}
        height={20}
        width={20}
        className={"inline mr-2 rounded-full"}
      />
      {tech.label}
    </Badge>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card className="hover:bg-white/5 transition-colors duration-300 w-full">
      <CardContent className="p-3 flex justify-between items-center h-full">
        <div className="flex items-center space-x-2 p-3">
          <Github className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">{project.name}</h2>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-wrap gap-1">
          {project.tech?.map((techName) => (
            <ProjectBadge key={techName} techName={techName} />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              className="h-18 w-18 bg-secondary text-sm p-2 rounded-md text-primary"
            >
              View Demo
            </Link>
          )}
          <Link
            href={project.codeUrl}
            className="h-18 w-18 bg-secondary text-sm p-2 rounded-md text-primary"
          >
            View Code
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

function Projects() {
  return (
    <>
      <h1 className="text-3xl font-bold flex items-center justify-center mb-16">
        <FolderKanban className="w-10 h-10 text-blue-500 mr-2" />
        Projects
      </h1>

      <div className="flex flex-col items-center gap-y-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

const TechStackCard: React.FC<{ tech: TechInfo }> = ({ tech }) => {
  return (
    <div className="h-32 w-32 border border-transparent rounded-lg flex flex-col items-center justify-around hover:border-gray-700 hover:bg-white/5 transition-all duration-300">
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger>
            <Image
              src={tech.icon_url}
              alt={tech.label}
              height={100}
              width={100}
              className={tech.label === "Kotlin" ? "" : "rounded-lg"}
            />
          </TooltipTrigger>
          <TooltipContent side={"bottom"}>
            <p>{tech.label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

function MyStack() {
  return (
    <>
      <h1 className="text-3xl font-bold flex items-center justify-center mb-20">
        <Blocks className="w-10 h-10 text-blue-500 mr-2" />
        Tech Stack
      </h1>
      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
        {techStacks.map((techStack, idx) => (
          <TechStackCard key={idx} tech={techStack} />
        ))}
      </div>
    </>
  );
}
