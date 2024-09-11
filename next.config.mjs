/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/Yarkis01/TyraDex/images/**/**",
      },
    ],
  },
};

export default nextConfig;
