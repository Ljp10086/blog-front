const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['demo.mxyhn.xyz', 'avatars.githubusercontent.com']
	},
	reactStrictMode: true,
	webpack: (config, {}) => {
		config.resolve.alias['@styles'] = path.resolve(__dirname, 'src/styles');
		config.resolve.alias['@app'] = path.resolve(__dirname, 'src');
		return config;
	}
};

module.exports = nextConfig;
