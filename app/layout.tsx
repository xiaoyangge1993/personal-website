import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kevinxiao.dev"),
  title: {
    default: "Kevin Xiao | Full Stack Engineer & UI Designer",
    template: "%s | Kevin Xiao",
  },
  description:
    "Kevin Xiao is a Full Stack Engineer specializing in React, Next.js, TypeScript, and 3D Web Experiences. Creating responsive, accessible, and performant web applications.",
  keywords: [
    "Kevin Xiao",
    "Full Stack Engineer",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Three.js",
    "UI Design",
    "Portfolio",
    "肖孝扬",
    "前端工程师",
    "全栈开发",
  ],
  authors: [{ name: "Kevin Xiao", url: "https://www.kevinxiao.dev" }],
  creator: "Kevin Xiao",
  publisher: "Kevin Xiao",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Kevin Xiao | Full Stack Engineer & UI Designer",
    description:
      "Portfolio of Kevin Xiao - Specializing in building exceptional digital experiences with modern web technologies.",
    url: "https://www.kevinxiao.dev",
    siteName: "Kevin Xiao Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/my-avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Kevin Xiao Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Xiao | Full Stack Engineer",
    description:
      "Building exceptional digital experiences with React, Next.js, and Three.js.",
    creator: "@kevinxiao",
    images: ["/images/my-avatar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.kevinxiao.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kevin Xiao",
    url: "https://www.kevinxiao.dev",
    image: "https://www.kevinxiao.dev/images/my-avatar.jpg",
    jobTitle: "Full Stack Engineer",
    description:
      "Full Stack Engineer specializing in React, Next.js, TypeScript, and 3D Web Experiences.",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "UI/UX Design",
      "Node.js",
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
