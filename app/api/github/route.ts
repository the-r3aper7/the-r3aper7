import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface GithubRepoProps {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
  fork: boolean;
  updated_at: string;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    if (!token || !username) {
      return NextResponse.json(
        { error: "GitHub credentials not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?type=public&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const repos: GithubRepoProps[] = await response.json();

    const formattedRepos = repos.filter((repo) => !repo.fork).map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
    }));

    return NextResponse.json(formattedRepos);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
