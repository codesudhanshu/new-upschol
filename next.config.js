module.exports = {
  experimental: {
    turbo: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upschol-prod.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'upschol-prod.s3.amazonaws.com',
      },
        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    domains: [
      'media.giphy.com',
      'upschol-prod.s3.ap-south-1.amazonaws.com',
      'upschol-prod.s3.amazonaws.com',
      'images.unsplash.com'
    ],
  },
};
