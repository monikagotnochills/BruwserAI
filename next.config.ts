import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.219"],
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig
