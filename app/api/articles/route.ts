import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { fetchLatestJuejinArticles } from "@/lib/articles";

const getCachedArticles = unstable_cache(
  () => fetchLatestJuejinArticles(5),
  ["juejin-latest-articles"],
  { revalidate: 3600 },
);

export async function GET() {
  try {
    const articles = await getCachedArticles();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Failed to fetch Juejin articles", error);
    return NextResponse.json({ articles: [] }, { status: 502 });
  }
}
