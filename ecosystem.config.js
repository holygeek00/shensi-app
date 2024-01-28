module.exports = {
  apps: [{
    name: 'nextjs-app',
    script: 'yarn',
    args: 'start -p 3888',
    watch: '.',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],
}
