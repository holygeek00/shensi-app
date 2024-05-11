import TerserPlugin from 'terser-webpack-plugin'
import path from "path";
const __filename = path.resolve();

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

    webpack5: true, // 确保使用 Webpack 5
    future: {
        webpack5: true,
    },

    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        if (!dev && !isServer) {
            const terserIndex = config.optimization.minimizer.findIndex(
                (minimizer) => minimizer.constructor.name === 'TerserPlugin'
            );

            if (terserIndex > -1) {
                const terserPlugin = config.optimization.minimizer[terserIndex];
                terserPlugin.options.terserOptions.compress.drop_console = true;
            }
        }

        config.cache = {
            type: 'filesystem', // 使用文件系统级缓存
            buildDependencies: {
                config: [__filename], // 当配置文件变化时，缓存失效
            },
        };

        // config.cache = {
        //     type: 'filesystem', // 指定缓存类型为文件系统
        //     cacheDirectory: path.resolve('.next/cache/webpack'), // 自定义缓存目录
        //     store: 'pack', // 缓存存储方式
        //     buildDependencies: {
        //         config: [__filename] // 当配置文件更改时，使缓存无效
        //     },
        // };

        config.resolve.alias['@/components'] = path.resolve(__dirname, 'components');
        config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');
        config.resolve.alias['@/lib'] = path.resolve(__dirname, 'lib');
        return config;
    },
}

export default nextConfig
