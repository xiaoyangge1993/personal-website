import { Metadata } from "next";
import StudioPageContent from "@/components/Studio/StudioPageContent";

export const metadata: Metadata = {
  title: "Studio | Kevin Xiao",
  description:
    "Kevin Xiao Studio - Professional Web Development Services. Custom websites, web applications, and digital solutions tailored to your needs.",
  keywords: [
    "Web Development Studio",
    "Freelance Developer",
    "Kevin Xiao Studio",
    "Custom Websites",
    "React Development",
    "Next.js Development",
    "外包服务",
    "网站开发",
    "独立开发者",
  ],
  alternates: {
    canonical: "https://www.kevinxiao.dev/studio",
  },
  openGraph: {
    title: "Studio | Kevin Xiao",
    description:
      "Professional Web Development Services by Kevin Xiao. High-quality, custom digital solutions.",
    url: "https://www.kevinxiao.dev/studio",
    images: [
      {
        url: "/images/my-avatar.jpg", // Ideally specific studio image
        width: 1200,
        height: 630,
        alt: "Kevin Xiao Studio",
      },
    ],
  },
};

export default function StudioPage() {
  return <StudioPageContent />;
}
