/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ord.xverse.app",
        pathname: "/content/**"
      }
    ]
  }
};

export default nextConfig;
