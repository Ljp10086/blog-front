const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['demo.mxyhn.xyz']
	},
	reactStrictMode: true,
	webpack: (config, {}) => {
		config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');
		config.resolve.alias['@'] = path.resolve(__dirname);
		return config;
	}
};

module.exports = nextConfig;
