module.exports = {
  apps: [{
      name: 'mo:q:q' +
        'ngostore',
      cwd: '/var/www/html/mongostore/web',
      script: '/var/www/html/mongostore/web/bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
    }
  ]
};
