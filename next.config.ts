/*
 * @Author: 孝扬
 * @Date: 2025-12-27 11:30:25
 * @LastEditors: 孝扬
 * @LastEditTime: 2026-01-17 12:50:11
 * @Version: V1.0
 * @Description:
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 禁用开发模式下的高内存特性
  reactStrictMode: false, // 关闭 React 严格模式（避免组件双重渲染，减少内存开销）
  transpilePackages: ["three"],
  typescript: {
    ignoreBuildErrors: true, // 开发时跳过 TypeScript 全量检查
    tsconfigPath: "./tsconfig.json", // 明确配置路径，避免重复解析
  },
  // 3. 优化构建缓存与资源加载
  experimental: {
    optimizePackageImports: ["three"], // 关闭实验性的包优化（旧硬件兼容性差）
    serverComponentsExternalPackages: [], // 禁用服务端组件外部包预加载
  },

  // 4. 限制图片/静态资源处理内存
  images: {
    unoptimized: true, // 关闭图片自动优化（开发时禁用，打包时再开启）
  },

  // 5. 禁用不必要的日志/监控
  logging: {
    fetches: {
      fullUrl: false, // 不打印完整请求 URL，减少日志内存占用
    },
  },
};

export default nextConfig;
