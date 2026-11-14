import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const supabaseStorageHost = process.env.NEXT_PUBLIC_SUPABASE_URL\n  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname\n  : undefined;\n\nconst nextConfig: NextConfig = {\n  images: {\n    remotePatterns: supabaseStorageHost ? [{ protocol: "https", hostname: supabaseStorageHost, pathname: "/storage/v1/object/public/catalog-media/**" }] : [],\n  },
  poweredByHeader: false,

  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
