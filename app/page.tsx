import { Code, Coffee, Gamepad, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LeetCodeIcon } from "@/components/icons/leetcode";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto mt-4 p-8">
          <Hero />
        </div>
      </div>
      <div className="w-full">
        <Contact />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <>
      <h1 className="text-4xl font-bold">
        Hello, Visitor 👋
      </h1>
      <p>
        I&apos;m a student, developer, and gamer passionate about creating
        innovative solutions. Currently working at{" "}
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
                href={"/projects"}
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
            <span>Open source contribution</span>
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
            <LeetCodeIcon className="w-6 h-6 text-blue-500" />
            <span className="hidden sm:inline ml-2">@the-r3aper7</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
