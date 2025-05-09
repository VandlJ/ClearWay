import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone' as const, // Using 'as const' to fix type issue
  // Updated: serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: [],
  // The server configuration needs to be defined differently:
  // hostname and port are set via environment variables or startup parameters
  env: {
    HOSTNAME: '0.0.0.0', // This can be used within the app
    PORT: process.env.PORT || '3000'
  }
};

export default withNextIntl(nextConfig);
