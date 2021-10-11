module.exports = {
  apps: [{
      name: 'mongostore',
      cwd: '/home/vagrant/code/mongostore',
      script: '/home/vagrant/code/mongostore/bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
    }
  ]
};
