module.exports = {
  apps: [{
    name: 'shensi-app',
    script: 'pnpm',
    args: 'start -p 80',
    watch: '.',
    env: {
      NODE_ENV: 'production',
    },
    env_development: {
      NODE_ENV: 'development',
    }
  }],
}
