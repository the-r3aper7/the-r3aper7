import GithubProjectCard from "@/components/shared/githubProjectCard";
import { Suspense } from "react";
import {GithubRepoProps} from "@/app/api/github/route";

async function getGithubProjects(): Promise<GithubRepoProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getGithubProjects();

  return (
    <main className="max-w-6xl mx-auto mt-4 p-8">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<ProjectsSkeleton />}>
          {projects.map((repo) => (
            <GithubProjectCard key={repo.name} {...repo} />
          ))}
        </Suspense>
      </div>
    </main>
  );
}

function ProjectsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full h-48 bg-muted rounded-lg animate-pulse"
        />
      ))}
    </>
  );
}
