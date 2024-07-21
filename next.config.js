module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
  images: {
    minimumCacheTTL: 5,
    domains: ['drive.google.com'],
  },
};
