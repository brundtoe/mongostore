module.exports = {
  apps: [{
      name: 'mongostore',
      cwd: '/home/vagrant/code/mongostore',
      script: '/home/vagrant/code/mongostore/bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
    },
    {
      name: 'nginx start',
      cwd: '/usr/bin',
      script: 'systemctl restart nginx',
      instances: 1,
      autorestart: false,
      watch: true,
    }
  ]
};
