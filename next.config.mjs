import TerserPlugin from 'terser-webpack-plugin'
import path from "path";
const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',

    // 自动静态优化超时
    staticPageGenerationTimeout: 60,

    // React 版本的设置（例如启用React 18的并发特性）
    reactStrictMode: true,

    // 使用SWC进行代码压缩
    swcMinify: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'daisyui.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'placeimg.com'
            }
        ]
    },

    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        // 生产环境且客户端构建时，才添加或修改TerserPlugin
        if (!dev && !isServer) {
            const existingTerserPlugin = config.optimization.minimizer.find(
                (plugin) => plugin.constructor.name === 'TerserPlugin'
            );

            if (existingTerserPlugin) {
                // 修改现有的TerserPlugin配置
                existingTerserPlugin.options.terserOptions = {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                };
            } else {
                // 添加TerserPlugin到minimizer
                config.optimization.minimizer.push(
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: true,  // 去除console
                                drop_debugger: true, // 去除debugger
                            },
                        },
                    })
                );
            }
        }

        config.resolve.alias['@/components'] = path.resolve(__dirname, 'components');
        config.resolve.alias['@/styles'] = path.resolve(__dirname, 'styles');
        config.resolve.alias['@/lib'] = path.resolve(__dirname, 'lib');
        config.resolve.alias['@/app'] = path.resolve(__dirname, 'app');

        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };

        return config;
    },

    // 运行时配置（仅服务器端可用）
    serverRuntimeConfig: {
        mySecret: 'secret',
    },

    // 运行时配置（客户端和服务器端可用）
    publicRuntimeConfig: {
        staticFolder: '/public',
    },

    // 性能优化：禁用某些特性以减少内存占用
    experimental: {
        largePageDataBytes: 128 * 1024, // 页面数据大小警告阈值
    },
}

export default nextConfig
