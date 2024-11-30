import { fetchWebsiteViews } from "@/lib/actions/websiteViews";

export default async function CountViewersPage() {
  const websiteCount = await fetchWebsiteViews();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center break-words">
          {Intl.NumberFormat().format(websiteCount)}
          <span className="text-sm sm:text-base md:text-lg lg:text-xl block mt-2">
            views
          </span>
        </h1>
      </div>
    </main>
  );
}
