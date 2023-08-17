const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/ui",
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${process.env.NEXT_PUBLIC_DOCS_URL}/:path*`,
          basePath: false,
        },
      ],
    }
  },
  reactStrictMode: true,
}

module.exports = withContentlayer(nextConfig)
