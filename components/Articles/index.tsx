"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ArticleItem } from "@/lib/articles";

const articleColors = [
  "bg-[#D7E3EE]",
  "bg-[#D6E6DF]",
  "bg-[#E3DCE8]",
  "bg-[#EDE6D6]",
  "bg-[#DCDBE8]",
];

type ArticleCardProps = {
  title: string;
  summary: string;
  color: string;
  link: string;
  coverImage?: string | null;
};

const ArticleCard = ({
  title,
  summary,
  color,
  link,
  coverImage,
}: ArticleCardProps) => {
  const { t } = useLanguage();
  const [coverFailed, setCoverFailed] = useState(false);
  const showCover = Boolean(coverImage) && !coverFailed;

  return (
    <motion.div
      className="rounded-xl shadow-soft overflow-hidden cursor-pointer h-full border border-subtle bg-surface"
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 },
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => {
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        }
      }}
    >
      {showCover ? (
        <div className={`h-40 w-full ${color} overflow-hidden`}>
          <img
            src={coverImage ?? ""}
            alt=""
            className="h-40 w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setCoverFailed(true)}
          />
        </div>
      ) : (
        <div className={`h-40 w-full ${color} flex items-center justify-center`}>
          <div className="text-4xl opacity-20">📝</div>
        </div>
      )}

      <div className="p-6 bg-surface h-full">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-foreground-secondary text-sm line-clamp-3 leading-relaxed">
          {summary}
        </p>

        <div className="mt-4 text-primary font-medium text-sm">
          {t.articles.read_more}
        </div>
      </div>
    </motion.div>
  );
};

const toArticleItem = (article: {
  id?: string;
  title: string;
  summary: string;
  link: string;
  coverImage?: string | null;
}): ArticleItem => ({
  id: article.id ?? article.link,
  title: article.title,
  summary: article.summary,
  link: article.link,
  coverImage: article.coverImage ?? null,
});

export default function Articles() {
  const { t } = useLanguage();
  const [liveArticles, setLiveArticles] = useState<ArticleItem[] | null>(null);
  const articles = liveArticles ?? t.articles.items.map(toArticleItem);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/articles")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { articles?: ArticleItem[] }) => {
        if (
          !cancelled &&
          Array.isArray(payload.articles) &&
          payload.articles.length > 0
        ) {
          setLiveArticles(payload.articles);
        }
      })
      .catch(() => {
        // Keep locale fallback when Juejin is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="articles" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          className="section-heading text-4xl md:text-5xl font-bold text-center text-foreground mb-24 md:mb-32 font-artistic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.articles.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard
                title={article.title}
                summary={article.summary}
                link={article.link}
                coverImage={article.coverImage}
                color={articleColors[index % articleColors.length]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
