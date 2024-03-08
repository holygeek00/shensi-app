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

    webpack: (config, {dev, isServer}) => {
        // 仅在生产模式和客户端构建中应用
        if (!dev && !isServer) {
            console.log("仅在生产模式和客户端构建中应用")
            // 确保TerserPlugin已经在minimizer数组中
            if (config.optimization && config.optimization.minimizer) {
                config.optimization.minimizer = config.optimization.minimizer.map((plugin) => {
                    if (plugin.constructor.name === 'TerserPlugin') {
                        // 修改TerserPlugin的配置
                        return new TerserPlugin({
                            ...plugin.options,
                            terserOptions: {
                                ...plugin.options.terserOptions,
                                compress: {
                                    ...plugin.options.terserOptions.compress,
                                    // 删除console.log，保留console.error和console.warn
                                    drop_console: true,
                                    pure_funcs: ['console.log'],
                                },
                            },
                        });
                    }
                    return plugin;
                });
            }
        }

        config.resolve.alias['@/components']= path.resolve(__dirname, 'components');
        config.resolve.alias['@styles']= path.resolve(__dirname, 'styles');
        config.resolve.alias['@/lib']= path.resolve(__dirname, 'lib');
        return config;
    },
}

export default nextConfig
