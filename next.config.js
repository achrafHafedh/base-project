/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });
        return config;
    },    
}

module.exports = nextConfig
