module.exports = {
  apps: [{
    name: 'shensi-app',
    script: 'pnpm',
    args: 'dev -p 3000',
    watch: '.',
    env: {
      NODE_ENV: 'production',
    },
    env_development: {
      NODE_ENV: 'development',
    }
  }],
}
