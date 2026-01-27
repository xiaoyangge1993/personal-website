import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kevinxiao.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Add other routes if they become separate pages
  ];
}
