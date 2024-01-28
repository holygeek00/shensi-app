module.exports = {
  apps : [{
    name: 'nextjs-app',
    script: 'yarn',
    args: 'start',
    watch: '.',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],
};
