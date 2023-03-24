const ghPages = require('gh-pages');

ghPages.publish(
    'dist',
    {
        branch: 'gh-pages',
        repo: 'ssh://git@github.com/mikaiyl/links.git',
        user: {
            name: 'mikaiyl',
            email: 'mikaiyl.davis@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)