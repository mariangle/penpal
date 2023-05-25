/** @type {import('next').NextConfig} */

// https://nextjs.org/docs/messages/next-image-unconfigured-host

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
        },
      ],
    },
  }

module.exports = nextConfig
