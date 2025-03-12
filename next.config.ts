import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: true,
    domains: [
      'storage.googleapis.com',
      'thispersondoesnotexist.com',
      'novo-site-unica.s3.amazonaws.com',
      'firebasestorage.googleapis.com',
      'github.com',
    ], 
  },
};

export default nextConfig;
