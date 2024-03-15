import TerserPlugin from 'terser-webpack-plugin'
import path from "path";

const __dirname = path.resolve();
/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'daisyui.com'
            },
        ]
    },

        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            if (!dev && !isServer) {
                const terserIndex = config.optimization.minimizer.findIndex(
                    (minimizer) => minimizer.constructor.name === 'TerserPlugin'
                );

                if (terserIndex > -1) {
                    const terserPlugin = config.optimization.minimizer[terserIndex];
                    terserPlugin.options.terserOptions.compress.drop_console = true;
                }
            }

        config.resolve.alias['@/components']= path.resolve(__dirname, 'components');
        config.resolve.alias['@styles']= path.resolve(__dirname, 'styles');
        config.resolve.alias['@/lib']= path.resolve(__dirname, 'lib');
        return config;
    },
}

export default nextConfig
