module.exports = {
    apps: [
        {
            name: 'Comptoir agricole',
            exec_mode: 'cluster',
            instances: '1', // Ou un certain nombre d'instances
            script: './node_modules/nuxt/bin/nuxt.js',
            cwd: '/var/www/nuxt/comptoir-agricole-web',
            args: 'start'
        }
    ]
}
