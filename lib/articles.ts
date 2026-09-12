export type ArticleItem = {
  id: string;
  title: string;
  summary: string;
  link: string;
  coverImage: string | null;
};

type JuejinArticleInfo = {
  article_id: string;
  title: string;
  brief_content: string;
  cover_image?: string;
};

type JuejinListResponse = {
  err_no: number;
  err_msg?: string;
  data?: Array<{
    article_id?: string;
    article_info?: JuejinArticleInfo;
  }>;
};

const JUEJIN_USER_ID = "1996368847058071";
const JUEJIN_LIST_URL = "https://api.juejin.cn/content_api/v1/article/query_list";

export async function fetchLatestJuejinArticles(
  limit = 5,
): Promise<ArticleItem[]> {
  const response = await fetch(JUEJIN_LIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      user_id: JUEJIN_USER_ID,
      sort_type: 2,
      cursor: "0",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Juejin list failed: ${response.status}`);
  }

  const payload = (await response.json()) as JuejinListResponse;
  if (payload.err_no !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload.err_msg || "Juejin list returned no data");
  }

  return payload.data.slice(0, limit).flatMap((item) => {
    const info = item.article_info;
    if (!info?.article_id || !info.title) {
      return [];
    }

    return [
      {
        id: info.article_id,
        title: info.title,
        summary: info.brief_content ?? "",
        link: `https://juejin.cn/post/${info.article_id}`,
        coverImage: info.cover_image?.trim() || null,
      },
    ];
  });
}
