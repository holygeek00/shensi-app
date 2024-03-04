import TerserPlugin from 'terser-webpack-plugin'
/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns:[
        {
            protocol: 'https',
            hostname: 'daisyui.com',
            pathname: '',
        },
    ]
  },

  webpack: (config, { dev, isServer }) => {
    // 只在生产环境和客户端构建时修改配置
    if (!dev && !isServer) {
        console.log("开始进行生产环境打包")
      config.optimization.minimizer = config.optimization.minimizer.map((plugin) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          return new TerserPlugin({
            ...plugin.options,
            terserOptions: {
              ...plugin.options.terserOptions,
              compress: {
                ...plugin.options.terserOptions.compress,
                drop_console: true, // 启用删除console
              },
            },
          });
        }
        return plugin;
      });
    }

    return config;
  },
}

export default nextConfig
