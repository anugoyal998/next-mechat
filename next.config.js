/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ui-avatars.com']
    },
    eslint: {
        ignoreDuringBuilds: true
    }
}

module.exports = nextConfig
