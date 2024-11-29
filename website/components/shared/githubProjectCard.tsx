import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Eye, GitFork, Github, Star} from "lucide-react";
import {GithubRepoProps} from "@/app/api/github/route";

export default function GithubProjectCard({
  name,
  description,
  language,
  stargazers_count,
  forks_count,
  watchers_count,
  html_url,
  updated_at,
}: GithubRepoProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          {language && <Badge variant="secondary">{language}</Badge>}
        </div>
        {description && (
          <CardDescription className="mt-2">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-blue-500" />
            <span>{stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4 text-blue-500" />
            <span>{forks_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-blue-500" />
            <span>{watchers_count.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <Github /> View Project
          </a>
        </Button>
        <div className="text-sm text-muted-foreground">
          Updated: {new Date(updated_at).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
}
