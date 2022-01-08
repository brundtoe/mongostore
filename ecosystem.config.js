module.exports = {
  apps: [{
      name: 'mongostore',
      cwd: '/var/www/html/mongostore',
      script: '/var/www/html/mongostore/bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
    }
  ]
};
